import { useTranslation } from 'react-i18next';

import './App.css';
import './assets/normalize.css';

import { LanguageSwitcher } from '@/components';
import { useLanguage } from '@/context/LanguageContext/LanguageContext';

function App() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <div>
      <LanguageSwitcher />
      <p>{t('todo.search')}</p>
      <p>{language}</p>
    </div>
  );
}

export default App;
