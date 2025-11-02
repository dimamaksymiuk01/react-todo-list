import styles from './assets/App.module.scss';
import './assets/normalize.css';

import { LanguageSwitcher } from '@/components';
import { ThemeSwitcher } from '@/components';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Todo List</h1>
          <div className={styles.switchers}>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
