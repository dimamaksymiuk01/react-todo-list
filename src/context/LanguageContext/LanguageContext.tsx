import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  getLanguageFromPath,
  addLanguagePrefix,
  removeLanguagePrefix,
} from '@/i18n/middleware';
import { Language, LanguageContextType } from '@/types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState<Language>(() => {
    return getLanguageFromPath(location.pathname);
  });

  useEffect(() => {
    const langFromUrl = getLanguageFromPath(location.pathname);
    if (langFromUrl !== language) {
      setLanguage(langFromUrl);
      i18n.changeLanguage(langFromUrl);
      localStorage.setItem('language', langFromUrl);
    }
  }, [location.pathname, language, i18n]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang: Language) => {
    const currentPath = removeLanguagePrefix(location.pathname);
    const newPath = addLanguagePrefix(currentPath, lang);

    setLanguage(lang);
    localStorage.setItem('language', lang);
    navigate(newPath, { replace: true });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage error');
  }
  return context;
};
