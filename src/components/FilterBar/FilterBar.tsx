import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './FilterBar.module.scss';

export const FilterBar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        <button className={`${styles.filter} ${styles.active}`}>{t('all')}</button>
        <button className={styles.filter}>{t('active')}</button>
        <button className={styles.filter}>{t('completed')}</button>
      </div>

      <div className={styles.search}>
        <Search className={styles.searchIcon} />
        <input
          type='text'
          placeholder={t('searchPlaceholder')}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};
