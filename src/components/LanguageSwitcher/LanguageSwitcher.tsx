import { FC } from 'react';

import styles from './LanguageSwitcher.module.scss';

import { useLanguage } from '@/context/LanguageContext/LanguageContext';
import { Language } from '@/types';

export const LanguageSwitcher: FC = () => {
  const { language, changeLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  ];

  return (
    <div className={styles.switcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.button} ${language === lang.code ? styles.active : ''}`}
          onClick={() => changeLanguage(lang.code)}
          aria-label={`Switch to ${lang.label}`}
        >
          <span className={styles.flag}>{lang.flag}</span>
          <span className={styles.label}>{lang.label}</span>
        </button>
      ))}
    </div>
  );
};
