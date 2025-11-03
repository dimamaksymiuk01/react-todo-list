import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  FC,
} from 'react';

import { todoReducer } from './todoReducer';

import { Todo, FilterType, TodoState, TodoContextType } from '@/types';
import { isOverdue, isDueToday } from '@/utils/deadline';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  history: [],
  filter: 'all',
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const TodoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const addTodo = (title: string, description?: string, deadline?: number) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      deadline,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
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
      case 'overdue':
        filtered = filtered.filter((todo) => !todo.completed && isOverdue(todo.deadline));
        break;
      case 'today':
        filtered = filtered.filter(
          (todo) => !todo.completed && isDueToday(todo.deadline),
        );
        break;
      case 'upcoming':
        filtered = filtered.filter(
          (todo) =>
            !todo.completed &&
            todo.deadline &&
            !isOverdue(todo.deadline) &&
            !isDueToday(todo.deadline),
        );
        break;
    }

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query)),
      );
    }

    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (state.sortBy) {
        case 'createdAt':
          compareValue = a.createdAt - b.createdAt;
          break;
        case 'deadline':
          if (!a.deadline && !b.deadline) compareValue = 0;
          else if (!a.deadline) compareValue = 1;
          else if (!b.deadline) compareValue = -1;
          else compareValue = a.deadline - b.deadline;
          break;
        case 'title':
          compareValue = a.title.localeCompare(b.title);
          break;
      }

      return state.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  };

  const value = useMemo(
    () => ({
      state,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo,
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
