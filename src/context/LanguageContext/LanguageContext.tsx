import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

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
    if (location.pathname.startsWith('/ua')) {
      return 'uk';
    }
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    const isUkrainianPath = location.pathname.startsWith('/ua');
    const newLang: Language = isUkrainianPath ? 'uk' : 'en';

    if (newLang !== language) {
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
      localStorage.setItem('language', newLang);
    }
  }, [location.pathname]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    if (location.pathname === '/') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'uk') {
        navigate('/ua', { replace: true });
      }
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    const newPath = lang === 'uk' ? '/ua' : '/';

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
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
