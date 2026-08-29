/**
 * Formats a date/timestamp into human-readable relative time:
 * - "a few moments ago"
 * - "1 minute ago" / "5 minutes ago"
 * - "1 hour ago" / "3 hours ago"
 * - "yesterday" / "3 days ago"
 * - "1 week ago" / "2 weeks ago"
 * - "Aug 29, 2026" (for older dates)
 */
export function formatTimeAgo(dateInput) {
  if (!dateInput) return 'a few moments ago';

  const date = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;

  if (isNaN(date.getTime())) return 'a few moments ago';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Future timestamp or less than 15 seconds
  if (diffInSeconds < 15) {
    return 'a few moments ago';
  }

  // Under a minute
  if (diffInSeconds < 60) {
    return 'less than a minute ago';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes === 1) {
    return '1 minute ago';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) {
    return '1 hour ago';
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return '1 week ago';
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return '1 month ago';
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  // Fallback to formatted date for older records
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
