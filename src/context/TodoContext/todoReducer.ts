import { MAX_HISTORY_RECORDS } from '@/constants';
import { TodoState, TodoAction } from '@/types';

const addHistoryRecord = (
  history: TodoState['history'],
  record: Omit<TodoState['history'][0], 'id' | 'timestamp'>,
  previousState: TodoState,
): TodoState['history'] => {
  const newRecord = {
    ...record,
    id: Date.now().toString(),
    timestamp: Date.now(),
    previousState,
  };

  const newHistory = [...history, newRecord];

  if (newHistory.length > MAX_HISTORY_RECORDS) {
    return newHistory.slice(-MAX_HISTORY_RECORDS);
  }

  return newHistory;
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newState: TodoState = {
        ...state,
        todos: [...state.todos, action.payload],
      };

      return {
        ...newState,
        history: addHistoryRecord(
          state.history,
          {
            action: 'added',
            todoTitle: action.payload.title,
          },
          state,
        ),
      };
    }

    case 'TOGGLE_TODO': {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (!todo) return state;

      const newState: TodoState = {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };

      return {
        ...newState,
        history: addHistoryRecord(
          state.history,
          {
            action: todo.completed ? 'uncompleted' : 'completed',
            todoTitle: todo.title,
          },
          state,
        ),
      };
    }

    case 'DELETE_TODO': {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (!todo) return state;

      const newState: TodoState = {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

      return {
        ...newState,
        history: addHistoryRecord(
          state.history,
          {
            action: 'deleted',
            todoTitle: todo.title,
          },
          state,
        ),
      };
    }

    case 'UPDATE_TODO': {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (!todo) return state;

      const newState: TodoState = {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.updates } : t,
        ),
      };

      return {
        ...newState,
        history: addHistoryRecord(
          state.history,
          {
            action: 'updated',
            todoTitle: todo.title,
            metadata: action.payload.updates.deadline
              ? {
                  deadline: action.payload.updates.deadline,
                }
              : undefined,
          },
          state,
        ),
      };
    }

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'UNDO_LAST_ACTION': {
      const lastRecord = state.history[state.history.length - 1];
      if (!lastRecord?.previousState) return state;

      return {
        ...lastRecord.previousState,
        history: state.history.slice(0, -1),
      };
    }

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
};
