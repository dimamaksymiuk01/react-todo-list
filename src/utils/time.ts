export const getTimeAgo = (timestamp: number, locale: string = 'uk'): string => {
  const now = Date.now();
  const diffMs = now - timestamp;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (locale === 'uk') {
    if (seconds < 60) return 'щойно';
    if (minutes < 60) return `${minutes} хв тому`;
    if (hours < 24) return `${hours} год тому`;
    if (days === 1) return 'вчора';
    return `${days} дн тому`;
  } else {
    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} h ago`;
    if (days === 1) return 'yesterday';
    return `${days} d ago`;
  }
};
