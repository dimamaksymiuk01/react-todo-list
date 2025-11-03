import { ListTodo } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TodoItem from '../TodoItem/TodoItem';

import styles from './TodoList.module.scss';

import { useTodo } from '@/context/TodoContext/TodoContext';

export const TodoList = () => {
  const { t } = useTranslation();
  const { state, getFilteredTodos } = useTodo();

  const filteredTodos = getFilteredTodos();
  const activeTodos = state.todos.filter((todo) => !todo.completed);
  const completedTodos = state.todos.filter((todo) => todo.completed);

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('taskListTitle')}</h2>
        <span className={styles.count}>
          {filteredTodos.length} {t('tasksCount')}
        </span>
      </div>

      {filteredTodos.length === 0 ? (
        <div className={styles.empty}>
          <ListTodo className={styles.emptyIcon} />
          <p className={styles.emptyText}>{t('noTasks')}</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      )}

      {state.todos.length > 0 && (
        <div className={styles.stats}>
          <span>
            {t('activeCount')}: {activeTodos.length}
          </span>
          <span>
            {t('completedCount')}: {completedTodos.length}
          </span>
        </div>
      )}
    </div>
  );
};
