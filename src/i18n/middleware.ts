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
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
};

export const addLanguagePrefix = (pathname: string, language: Language): string => {
  const cleanPath = removeLanguagePrefix(pathname);
  const prefix = language === 'en' ? '' : '/ua';

  return prefix + cleanPath;
};
