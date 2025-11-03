import * as yup from 'yup';

import { VALIDATION } from '@/constants';

export interface TodoFormData {
  title: string;
  description?: string | null;
}

export const createTodoSchema = (
  t: (key: string) => string,
): yup.ObjectSchema<TodoFormData> =>
  yup.object({
    title: yup
      .string()
      .transform((value) => value?.trim())
      .required(t('validation.titleRequired'))
      .min(VALIDATION.TITLE_MIN_LENGTH, t('validation.titleMin'))
      .max(VALIDATION.TITLE_MAX_LENGTH, t('validation.titleMax'))
      .test('no-only-spaces', t('validation.titleRequired'), (value) => {
        return value ? value.trim().length > 0 : false;
      }),
    description: yup
      .string()
      .transform((value) => (value ? value.trim() : ''))
      .notRequired()
      .test('min-if-exists', t('validation.descriptionMin'), (value) => {
        if (!value || value.trim() === '') return true;
        return value.trim().length >= VALIDATION.DESCRIPTION_MIN_LENGTH;
      })
      .test('max-if-exists', t('validation.descriptionMax'), (value) => {
        if (!value || value.trim() === '') return true;
        return value.trim().length <= VALIDATION.DESCRIPTION_MAX_LENGTH;
      }),
  });
