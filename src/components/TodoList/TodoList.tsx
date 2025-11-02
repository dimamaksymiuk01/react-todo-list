import { useTranslation } from 'react-i18next';

import TodoItem from '../TodoItem/TodoItem.tsx';

import styles from './TodoList.module.scss';

const mockTodos = [
  {
    id: 1,
    title: 'Купити молоко',
    description: 'Взяти 2 літри молока в магазині',
    completed: false,
  },
  {
    id: 2,
    title: 'Прибрати кімнату',
    description: 'Пропилососити та протерти пил',
    completed: true,
  },
  {
    id: 3,
    title: 'Написати звіт',
    description: 'Підготувати квартальний звіт для керівництва',
    completed: false,
  },
  {
    id: 4,
    title: 'Погладити кота',
    description: 'Приділити увагу улюбленцю',
    completed: false,
  },
  {
    id: 5,
    title: 'Зробити зарядку',
    description: '15 хвилин ранкової зарядки',
    completed: true,
  },
];

export const TodoList = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <h2 className={styles.title}> {t('taskListTitle')}</h2>
        <span className={styles.count}>5 {t('tasksCount')}</span>
      </div>

      <div className={styles.list}>
        {mockTodos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>

      <div className={styles.stats}>
        <span>{t('activeCount')}: 3</span>
        <span>{t('completedCount')}: 2</span>
      </div>
    </div>
  );
};
