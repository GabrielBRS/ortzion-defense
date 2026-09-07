export function formatTimestamp(value: string | null): string {
  if (!value) return 'No recent contact';
  return (
    new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date(value)) + ' UTC'
  );
}

export function formatShortTimestamp(value: string | null): string {
  if (!value) return 'Not available';
  return (
    new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(new Date(value)) + ' UTC'
  );
}
