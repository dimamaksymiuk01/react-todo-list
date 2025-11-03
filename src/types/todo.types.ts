export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  history: HistoryRecord[];
  filter: FilterType;
  searchQuery: string;
}

export interface HistoryRecord {
  id: string;
  action: ActionType;
  todoTitle: string;
  timestamp: number;
  previousState?: TodoState;
}

export type ActionType = 'added' | 'completed' | 'uncompleted' | 'deleted';

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

export interface TodoContextType {
  state: TodoState;
  addTodo: (title: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearch: (query: string) => void;
  undoLastAction: () => void;
  getFilteredTodos: () => Todo[];
}
