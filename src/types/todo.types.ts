export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  deadline?: number;
}

export type FilterType =
  | 'all'
  | 'active'
  | 'completed'
  | 'overdue'
  | 'today'
  | 'upcoming';

export type SortType = 'createdAt' | 'deadline' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface TodoState {
  todos: Todo[];
  history: HistoryRecord[];
  filter: FilterType;
  searchQuery: string;
  sortBy: SortType;
  sortOrder: SortOrder;
}

export interface HistoryRecord {
  id: string;
  action: ActionType;
  todoTitle: string;
  timestamp: number;
  previousState?: TodoState;
  metadata?: {
    deadline?: number;
  };
}

export type ActionType =
  | 'added'
  | 'completed'
  | 'uncompleted'
  | 'deleted'
  | 'updated'
  | 'deadline_set'
  | 'deadline_removed';

export interface TodoContextType {
  state: TodoState;
  addTodo: (title: string, description?: string, deadline?: number) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (query: string) => void;
  undoLastAction: () => void;
  getFilteredTodos: () => Todo[];
}
