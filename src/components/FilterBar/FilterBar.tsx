import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './FilterBar.module.scss';

import { useTodo } from '@/context/TodoContext/TodoContext';
import { useDebounce } from '@/hooks/useDebounce';
import { FilterType } from '@/types';

export const FilterBar = () => {
  const { t } = useTranslation();
  const { state, setFilter, setSearch } = useTodo();
  const [searchInput, setSearchInput] = useState(state.searchQuery);

  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
};
