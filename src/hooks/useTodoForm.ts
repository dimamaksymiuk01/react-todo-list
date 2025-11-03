import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { createTodoSchema, TodoFormData } from '@/utils/todoSchema.ts';

export const useTodoForm = () => {
  const { t } = useTranslation();

  const schema = createTodoSchema(t);

  return useForm<TodoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });
};
