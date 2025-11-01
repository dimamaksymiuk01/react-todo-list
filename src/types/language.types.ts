export type Language = 'en' | 'uk';

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export const URL_LANGUAGE_MAP: Record<string, Language> = {
  '': 'en',
  ua: 'uk',
};
