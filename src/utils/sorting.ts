/**
 * Parses the end date from a period string (e.g. "June 2025 - May 2026", "Jul 2025 - Present").
 * Returns a Date object representing the end of the period.
 */
export function parsePeriodEndDate(period: string): Date {
  if (!period) return new Date(0);

  const parts = period.split(/\s*-\s*/);
  const endPart = parts[parts.length - 1].trim();

  if (endPart.toLowerCase() === 'present' || endPart.toLowerCase() === 'current') {
    return new Date();
  }

  // Match Month (letters) and/or Year (4 digits)
  const match = endPart.match(/([a-zA-Z]+)?\s*(\d{4})/);
  if (match) {
    const monthStr = match[1] ? match[1].toLowerCase() : '';
    const year = parseInt(match[2], 10);

    const monthMap: Record<string, number> = {
      jan: 0,
      january: 0,
      feb: 1,
      february: 1,
      mar: 2,
      march: 2,
      apr: 3,
      april: 3,
      may: 4,
      jun: 5,
      june: 5,
      jul: 6,
      july: 6,
      aug: 7,
      august: 7,
      sep: 8,
      september: 8,
      oct: 9,
      october: 9,
      nov: 10,
      november: 10,
      dec: 11,
      december: 11,
    };

    // Normalize to 3 characters to support both long and short month names
    const normalizeKey = monthStr.substring(0, 3);
    const month = normalizeKey in monthMap ? monthMap[normalizeKey] : 0;

    return new Date(year, month, 1);
  }

  const parsed = Date.parse(endPart);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

/**
 * Compares two period strings for sorting (latest at top).
 */
export function comparePeriods(p1: string, p2: string): number {
  const d1 = parsePeriodEndDate(p1);
  const d2 = parsePeriodEndDate(p2);
  return d2.getTime() - d1.getTime();
}

/**
 * Compares two quarter strings (e.g. "2026 Q3") for sorting (latest at top).
 */
export function compareQuarters(q1: string, q2: string): number {
  const match1 = q1.match(/(\d{4})\s*Q(\d)/);
  const match2 = q2.match(/(\d{4})\s*Q(\d)/);
  if (match1 && match2) {
    const y1 = parseInt(match1[1], 10);
    const qtr1 = parseInt(match1[2], 10);
    const y2 = parseInt(match2[1], 10);
    const qtr2 = parseInt(match2[2], 10);

    if (y1 !== y2) {
      return y2 - y1;
    }
    return qtr2 - qtr1;
  }
  return q2.localeCompare(q1);
}

/**
 * Compares two ISO date strings (e.g. "2026-06-24") for sorting (latest at top).
 */
export function compareDates(d1: string, d2: string): number {
  return d2.localeCompare(d1);
}
