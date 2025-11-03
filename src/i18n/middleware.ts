import { Language, URL_LANGUAGE_MAP } from '@/types';

export const getLanguageFromPath = (pathname: string): Language => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';

  return URL_LANGUAGE_MAP[firstSegment] || 'en';
};

export const removeLanguagePrefix = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';

  if (URL_LANGUAGE_MAP[firstSegment]) {
    const remaining = segments.slice(1);
    return remaining.length > 0 ? '/' + remaining.join('/') : '/';
  }

  return pathname || '/';
};

export const addLanguagePrefix = (pathname: string, language: Language): string => {
  const cleanPath = removeLanguagePrefix(pathname);

  if (language === 'en') {
    return cleanPath;
  }

  return '/ua' + (cleanPath === '/' ? '' : cleanPath);
};
