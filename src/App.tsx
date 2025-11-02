import styles from './assets/App.module.scss';
import './assets/normalize.css';

import {
  FilterBar,
  LanguageSwitcher,
  TodoForm,
  ThemeSwitcher,
  History,
  TodoList,
} from '@/components';

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

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.todoSection}>
            <TodoForm />
            <FilterBar />
            <TodoList />
          </div>

          <aside className={styles.sidebar}>
            <History />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
