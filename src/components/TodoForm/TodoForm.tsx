import { AlertCircle, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './TodoForm.module.scss';

import { useTodo } from '@/context/TodoContext/TodoContext';
import { useTodoForm } from '@/hooks/useTodoForm';

export const TodoForm = () => {
  const { t } = useTranslation();
  const { addTodo } = useTodo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useTodoForm();

  const onSubmit = (data: { title: string; description?: string | null }) => {
    addTodo(data.title, data.description ?? undefined);
    reset();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.header}>
        <Plus />
        <span>{t('addNewTask')}</span>
      </h2>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.label}>
            {t('taskName')} <span className={styles.required}>*</span>
          </label>
          <input
            type='text'
            placeholder={t('taskNamePlaceholder')}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            {...register('title')}
          />
          {errors.title && (
            <p className={styles.error}>
              <AlertCircle />
              {errors.title.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {t('taskDescription')}
            <span className={styles.optional}> {t('optional')}</span>
          </label>
          <textarea
            placeholder={t('descriptionPlaceholder')}
            rows={3}
            className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
            {...register('description')}
          />
          {errors.description && (
            <p className={styles.error}>
              <AlertCircle />
              {errors.description.message}
            </p>
          )}
          {!errors.description && <p className={styles.hint}>{t('descriptionHint')}</p>}
        </div>

        <button type='submit' className={styles.button}>
          <Plus />
          {t('addTaskButton')}
        </button>
      </div>
    </form>
  );
};
