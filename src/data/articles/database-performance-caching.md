# Scaling Database Operations in WordPress: Optimizing Bulk Imports and Flat Query Caching

WordPress plugins built around complex data models, such as Event Espresso 4 (EE4), frequently suffer from performance degradation as the database scales. The primary culprit is relational normalization. While a highly normalized database schema minimizes redundancy and guarantees data consistency, it is highly inefficient for read-heavy operations, real-time query notifications, and bulk data imports.

In this article, we will examine the database performance bottlenecks in projects like `ut-ecourse-importer` and `uniTech-event-notification`. We will discuss how to resolve relational JOIN bottlenecks, implement denormalized flat caching tables, leverage heavy indexing, design SQL Case-weighted scoring, and implement batch pagination to prevent PHP memory limits from being exceeded.

---

## The Bottleneck: Relational JOINs and Memory Exhaustion

Event Espresso divides its core domain entities across multiple tables. For instance, obtaining a registration with its attendee information, questionnaire answers, and event details requires joining several tables:

- `esp_registration`: Links transactions, tickets, and attendees.
- `esp_attendee`: Stores profile information (names, emails, phones).
- `esp_answer`: Holds responses to registration questions.
- `esp_question`: Holds the question metadata.

When importing data from external sources (such as course rosters in CSV or XML format) and matching each record to an existing registration, we must query this structure repeatedly. Under standard WordPress ORM operations, a single import process matching thousands of rows will run thousands of multi-table JOIN queries. This triggers database lock contention, page-render timeouts, and inevitably crashes the application with a `fatal error: Allowed memory size of X bytes exhausted`.

Furthermore, for real-time notification engines (such as responding to Twilio webhook SMS replies), the application must verify the sender's validation window within milliseconds. Querying normalized data under high traffic volume creates unacceptable latency.

---

## Design Solution 1: Denormalized Flat Cache Tables

To bypass relational complexity, we implemented a **denormalized flat cache table** approach. Instead of query-time JOINs, we store all key queryable fields in a flat, custom database table: `wp_ut_ecourse_registrations_cache` and `wp_ut_twilio_messages_cache`.

Each row in these tables represents a complete registration state containing:
- Attendee name, email, and phone number.
- Registration dates and event ID.
- Custom identifiers (driving licenses, MSF numbers).

Here is the database schema definition and creation hook:

```php
/**
 * Creates the denormalized flat cache table for rapid registration lookups.
 */
function ut_create_flat_registration_cache_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'ut_ecourse_registrations_cache';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        reg_id bigint(20) NOT NULL,
        attendee_id bigint(20) NOT NULL,
        attendee_fname varchar(100) NOT NULL,
        attendee_lname varchar(100) NOT NULL,
        attendee_email varchar(150) NOT NULL,
        phone varchar(50) DEFAULT '' NOT NULL,
        driving_license varchar(50) DEFAULT '' NOT NULL,
        msf_number varchar(50) DEFAULT '' NOT NULL,
        reg_date datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY reg_id (reg_id),
        KEY attendee_email (attendee_email),
        KEY phone (phone),
        KEY driving_license (driving_license),
        KEY msf_number (msf_number),
        KEY reg_date (reg_date)
    ) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );
}
```

By maintaining this cache table through Event Espresso registration hooks, we write once during registration creation/updates, allowing subsequent reads to target a single, flat row.

---

## Design Solution 2: Heavy Indexing

As the database grows, scanning the flat cache table can still slow down if it scales to tens of thousands of records. Adding heavy indexes on search-intensive fields transforms sequential table scans (O(N) time complexity) into highly optimized binary tree index lookups (O(log N) complexity).

In our schema above, we explicitly index the fields:
- `attendee_email`
- `phone`
- `driving_license`
- `msf_number`
- `reg_date`

When checking webhook payloads, such as matching incoming SMS sender phone numbers against the database, MySQL resolves the query in milliseconds by jumping straight to the phone number index, avoiding a full table scan.

---

## Design Solution 3: SQL Case-Weighted Scoring for Advanced Matching

A common mistake in WordPress plugins is importing records, downloading the entire matching dataset into PHP memory, and utilizing complex PHP matching logic (such as string distances or conditional checks) to identify the closest match. This practice causes immediate memory exhaustion under load.

Instead, we offload relevance scoring directly to MySQL. By utilizing SQL `CASE WHEN` clauses, we can calculate a relevance score in the database and return only the best candidate matches.

```php
/**
 * Searches the registration cache and scores matches based on search parameter relevance.
 *
 * @param string $email The target attendee email.
 * @param string $fname The target first name.
 * @param string $lname The target last name.
 * @return array Array of matched records sorted by relevance.
 */
function ut_get_scored_registration_matches( $email, $fname, $lname ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'ut_ecourse_registrations_cache';

    $email = sanitize_email( $email );
    $fname = sanitize_text_field( $fname );
    $lname = sanitize_text_field( $lname );

    // Scoring formula:
    // 100 points: Perfect match of Email, First Name, and Last Name.
    //  80 points: Email matches exactly.
    //  60 points: First Name and Last Name match exactly.
    //   0 points: No match.
    $query = $wpdb->prepare(
        "SELECT *, 
        CASE 
            WHEN attendee_email = %s AND attendee_fname = %s AND attendee_lname = %s THEN 100
            WHEN attendee_email = %s THEN 80
            WHEN attendee_fname = %s AND attendee_lname = %s THEN 60
            ELSE 0
        END as match_score
        FROM {$table_name} 
        WHERE attendee_email = %s OR (attendee_fname = %s AND attendee_lname = %s)
        ORDER BY match_score DESC
        LIMIT 5",
        $email, $fname, $lname,
        $email,
        $fname, $lname,
        $email, $fname, $lname
    );

    return $wpdb->get_results( $query, ARRAY_A );
}
```

This query returns records pre-sorted by relevance score. Since it uses indexes, the database filter executes in milliseconds, returning a tiny array of structured matches instead of loading megabytes of text into PHP memory.

---

## Design Solution 4: Batch Processing and Pagination

For bulk importers, processing a 10,000-row file in a single HTTP request will trigger a PHP execution timeout. To avoid this, we paginate imports using AJAX or WP-CLI, chunking the records into safe execution batches.

Below is the controller pattern utilized in the import task:

```php
/**
 * AJAX handler for paginated CSV imports.
 */
function ut_handle_paginated_import_ajax() {
    // Nonce and capabilities check for security
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'ut_import_nonce_action' ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized action' ), 403 );
    }

    if ( ! current_user_can( 'import' ) ) {
        wp_send_json_error( array( 'message' => 'Insufficient permissions' ), 403 );
    }

    $batch_size = 100;
    $offset = isset( $_POST['offset'] ) ? intval( $_POST['offset'] ) : 0;
    $file_path = isset( $_POST['file_path'] ) ? sanitize_text_field( $_POST['file_path'] ) : '';

    if ( empty( $file_path ) || ! file_exists( $file_path ) ) {
        wp_send_json_error( array( 'message' => 'Invalid file path' ), 400 );
    }

    // Process a chunk of lines from the CSV
    $results = ut_process_csv_batch( $file_path, $offset, $batch_size );

    wp_send_json_success( array(
        'offset'    => $offset + $batch_size,
        'processed' => count( $results ),
        'done'      => count( $results ) < $batch_size,
    ) );
}
add_action( 'wp_ajax_ut_import_batch', 'ut_handle_paginated_import_ajax' );
```

---

## Conclusion & Architectural Summary

Scaling WordPress database interactions for enterprise applications requires moving away from the default WordPress/Event Espresso ORM abstractions for read-heavy operations.

By taking control of database caching and query execution, we achieve significant performance improvements:
1. **Flatten normalized tables** into custom, single-row cache tables.
2. **Apply explicit indexing** to fields commonly searched during imports and webhook requests.
3. **Write SQL-level relevance calculations** to offload processing to the database.
4. **Use AJAX or CLI-driven batch pagination** to ensure CPU/memory usage remains flat regardless of overall import size.

These engineering principles keep database latency low and application memory clean, providing a fast, scalable user experience.
