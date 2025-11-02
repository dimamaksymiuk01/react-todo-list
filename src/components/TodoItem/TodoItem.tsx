import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

import styles from './TodoItem.module.scss';

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoItem({ id, title, description, completed }: TodoItemProps) {
  console.log('id', id);
  return (
    <div className={`${styles.todoItem} ${completed ? styles.completed : ''}`}>
      <div className={styles.content}>
        <input type='checkbox' checked={completed} className={styles.checkbox} />

        <div className={styles.details}>
          <h3 className={`${styles.title} ${completed ? styles.titleCompleted : ''}`}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actions}>
          {completed ? (
            <CheckCircle2 className={`${styles.status} ${styles.statusCompleted}`} />
          ) : (
            <Circle className={`${styles.status} ${styles.statusPending}`} />
          )}
          <button className={styles.delete}>
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
