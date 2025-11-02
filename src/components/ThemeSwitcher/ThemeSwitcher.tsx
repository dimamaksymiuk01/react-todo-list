import { FC } from 'react';

import styles from './ThemeSwitcher.module.scss';

import { useTheme } from '@/context/ThemeContext/ThemeContext';

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={styles.switchContainer}>
      <input
        type='checkbox'
        checked={theme === 'light'}
        onChange={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      />
      <span className={styles.slider}></span>
    </label>
  );
};
