import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

export const getTimeAgo = (timestamp: number, locale: string = 'uk'): string => {
  const localizedDayjs = dayjs(timestamp).locale(locale);

  return localizedDayjs.fromNow();
};
