import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

import styles from './TodoItem.module.scss';

import { useTodo } from '@/context/TodoContext/TodoContext';

interface TodoItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoItem = ({ id, title, description, completed }: TodoItemProps) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div className={`${styles.todoItem} ${completed ? styles.completed : ''}`}>
      <div className={styles.content}>
        <input
          type='checkbox'
          checked={completed}
          onChange={() => toggleTodo(id)}
          className={styles.checkbox}
        />

        <div className={styles.details}>
          <h3 className={`${styles.title} ${completed ? styles.titleCompleted : ''}`}>
            {title}
          </h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.actions}>
          {completed ? (
            <CheckCircle2 className={`${styles.status} ${styles.statusCompleted}`} />
          ) : (
            <Circle className={`${styles.status} ${styles.statusPending}`} />
          )}
          <button
            className={styles.delete}
            onClick={() => deleteTodo(id)}
            aria-label='Delete task'
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
