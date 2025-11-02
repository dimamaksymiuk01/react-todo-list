import { AlertCircle, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './TodoForm.module.scss';

interface TodoFormProps {
  showValidation?: boolean;
}

export const TodoForm = ({ showValidation = true }: TodoFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.todoForm}>
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
            className={`${styles.input} ${showValidation ? styles.inputError : ''}`}
          />
          {showValidation && (
            <p className={styles.error}>
              <AlertCircle />
              {t('minLength3')}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            {t('taskDescription')}
            <span className={styles.optional}>{t('optional')}</span>
          </label>
          <textarea
            placeholder={t('descriptionPlaceholder')}
            rows={3}
            className={styles.textarea}
          />
          <p className={styles.hint}>{t('descriptionHint')}</p>
        </div>

        <button className={styles.button}>
          <Plus />
          {t('addTaskButton')}
        </button>
      </div>
    </div>
  );
};
