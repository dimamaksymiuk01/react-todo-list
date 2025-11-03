export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
  TODAY: 'today',
  UPCOMING: 'upcoming',
} as const;

export const SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  DEADLINE: 'deadline',
  TITLE: 'title',
} as const;

export const MAX_HISTORY_RECORDS = 10;

export const VALIDATION = {
  TITLE_MIN_LENGTH: 3,
  DESCRIPTION_MIN_LENGTH: 10,
} as const;

export const STORAGE_KEYS = {
  TODO_STATE: 'todoState',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const TIME_CONSTANTS = {
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
} as const;
