import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './FilterBar.module.scss';

import { useTodo } from '@/context/TodoContext/TodoContext';
import { FilterType } from '@/types';

export const FilterBar = () => {
  const { t } = useTranslation();
  const { state, setFilter, setSearch } = useTodo();

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'active', label: t('active') },
    { value: 'completed', label: t('completed') },
  ];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filter} ${state.filter === filter.value ? styles.active : ''}`}
            onClick={() => setFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.search}>
        <Search className={styles.searchIcon} />
        <input
          type='text'
          placeholder={t('searchPlaceholder')}
          className={styles.searchInput}
          value={state.searchQuery}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
