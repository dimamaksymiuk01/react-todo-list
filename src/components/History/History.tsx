import { Undo } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './History.module.scss';

import { useLanguage } from '@/context/LanguageContext/LanguageContext';
import { useTodo } from '@/context/TodoContext/TodoContext';
import { getTimeAgo } from '@/utils/time';

export const History = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { state, undoLastAction } = useTodo();

  const getActionText = (action: string) => {
    return t(`history.${action}`);
  };

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('changeHistory')}</h2>
        {state.history.length > 0 && (
          <button
            className={styles.undoButton}
            onClick={undoLastAction}
            title={t('undo')}
          >
            <Undo />
          </button>
        )}
      </div>

      {state.history.length === 0 ? (
        <div className={styles.empty}>{t('noHistory')}</div>
      ) : (
        <div className={styles.list}>
          {[...state.history].reverse().map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={`${styles.dot} ${styles[`dot--${item.action}`]}`} />
              <div className={styles.content}>
                <p className={styles.text}>
                  <span
                    className={`${styles.action} ${styles[`action--${item.action}`]}`}
                  >
                    {getActionText(item.action)}
                  </span>
                  : {item.todoTitle}
                </p>
                <span className={styles.time}>
                  {getTimeAgo(item.timestamp, language)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
