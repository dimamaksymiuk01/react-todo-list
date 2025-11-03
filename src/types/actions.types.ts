import { Todo, FilterType, TodoState } from './todo.types';

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'UNDO_LAST_ACTION' }
  | { type: 'LOAD_STATE'; payload: TodoState };
