import { Plus, CheckCircle, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from './History.module.scss';

const mockHistory = [
  { id: 1, action: 'add', text: 'Додано: Купити молоко', time: '2 хв тому' },
  { id: 2, action: 'complete', text: 'Виконано: Прибрати кімнату', time: '5 хв тому' },
  { id: 3, action: 'add', text: 'Додано: Написати звіт', time: '10 хв тому' },
  { id: 4, action: 'delete', text: 'Видалено: Погладити кота', time: '15 хв тому' },
  { id: 5, action: 'complete', text: 'Виконано: Зробити зарядку', time: '20 хв тому' },
];

export const History = () => {
  const { t } = useTranslation();

  const getIcon = (action: string) => {
    switch (action) {
      case 'add':
        return <Plus className={styles.iconAdd} />;
      case 'complete':
        return <CheckCircle className={styles.iconComplete} />;
      case 'delete':
        return <Trash2 className={styles.iconDelete} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('changeHistory')}</h2>
      </div>

      <div className={styles.list}>
        {mockHistory.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.icon}>{getIcon(item.action)}</div>
            <div className={styles.content}>
              <p className={styles.text}>{item.text}</p>
              <span className={styles.time}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
