import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';

import { todoReducer } from './todoReducer';

import { TodoContextType, Todo, FilterType, TodoState } from '@/types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  history: [],
  filter: 'all',
  searchQuery: '',
};

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem('todoState');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initial,
          ...parsed,
          searchQuery: '',
        };
      }
    } catch (error) {
      console.error(error);
    }
    return initial;
  });

  useEffect(() => {
    try {
      localStorage.setItem('todoState', JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  const addTodo = (title: string, description?: string) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description?.trim();

    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: trimmedTitle,
      description: trimmedDescription || undefined,
      completed: false,
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const setFilter = (filter: FilterType) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const undoLastAction = () => {
    dispatch({ type: 'UNDO_LAST_ACTION' });
  };

  const getFilteredTodos = (): Todo[] => {
    let filtered = [...state.todos];

    switch (state.filter) {
      case 'active':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
    }

    const trimmedQuery = state.searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(trimmedQuery) ||
          (todo.description && todo.description.toLowerCase().includes(trimmedQuery)),
      );
    }

    filtered.sort((a, b) => b.createdAt - a.createdAt);

    return filtered;
  };

  const value = useMemo(
    () => ({
      state,
      addTodo,
      toggleTodo,
      deleteTodo,
      setFilter,
      setSearch,
      undoLastAction,
      getFilteredTodos,
    }),
    [state],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
