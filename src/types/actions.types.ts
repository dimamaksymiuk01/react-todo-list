import { Todo, FilterType, SortType, SortOrder, TodoState } from './todo.types';

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'SET_DEADLINE'; payload: { id: string; deadline: number | null } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SORT'; payload: { sortBy: SortType; sortOrder: SortOrder } }
  | { type: 'UNDO_LAST_ACTION' }
  | { type: 'LOAD_STATE'; payload: TodoState };
