import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { VALIDATION } from '@/constants';

interface TodoFormData {
  title: string;
  description?: string;
  deadline?: Date | null;
}

export const useTodoForm = () => {
  const { t } = useTranslation();

  const schema: yup.ObjectSchema<TodoFormData> = yup.object({
    title: yup
      .string()
      .required(t('validation.titleRequired'))
      .min(VALIDATION.TITLE_MIN_LENGTH, t('validation.titleMin')),
    description: yup
      .string()
      .optional()
      .test('min-if-exists', t('validation.descriptionMin'), (value) => {
        if (!value || value.trim() === '') return true;
        return value.length >= VALIDATION.DESCRIPTION_MIN_LENGTH;
      }),
  }) as yup.ObjectSchema<TodoFormData>;

  return useForm<TodoFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      deadline: null,
    },
    mode: 'onChange',
  });
};
