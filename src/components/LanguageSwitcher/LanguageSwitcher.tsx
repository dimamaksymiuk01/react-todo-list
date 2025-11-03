import { Languages } from 'lucide-react';

import styles from './LanguageSwitcher.module.scss';

import { useLanguage } from '@/context/LanguageContext/LanguageContext';
import { Language } from '@/types';

export const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UA' },
  ];

  const nextLanguage = language === 'en' ? 'uk' : 'en';
  const currentLabel = languages.find((lang) => lang.code === language)?.label;

  return (
    <button
      className={styles.languageSwitcher}
      onClick={() => changeLanguage(nextLanguage)}
      title='Змінити мову / Change language'
      aria-label={`Switch to ${nextLanguage === 'en' ? 'English' : 'Українська'}`}
    >
      <Languages />
      <span className={styles.text}>{currentLabel}</span>
    </button>
  );
};
