# Configuring Headless WordPress via WP GraphQL

Decoupling WordPress to serve as a headless CMS for a React frontend requires a robust API design and a secure backend. Rather than traditional REST endpoints, combining WordPress with **WPGraphQL** provides high-efficiency data fetching, reducing payloads and network request roundtrips.

## 1. Setting Up the Schema Resolvers
To expose custom post types and ACF fields, register them with GraphQL arguments:

```php
add_action('graphql_register_types', function() {
    register_graphql_field('Post', 'customReadingTime', [
        'type' => 'String',
        'description' => __('Estimated reading duration', 'portfolio'),
        'resolve' => function($post) {
            $content = get_post_field('post_content', $post->databaseId);
            $words = str_word_count(strip_tags($content));
            $minutes = ceil($words / 200);
            return $minutes . ' min read';
        }
    ]);
});
```

## 2. Optimizing Query Latency
WordPress database schemas are historically complex. To prevent N+1 query patterns:
1. Enable **WPGraphQL Smart Caching** to load queries from Redis memory.
2. Restrict public schema access to prevent query scraping.
3. Serve dynamic client requests using static paths dynamically revalidated on post update hooks.
