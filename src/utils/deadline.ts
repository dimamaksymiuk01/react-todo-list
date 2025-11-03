import { TIME_CONSTANTS } from '@/constants';

export const isOverdue = (deadline?: number): boolean => {
  if (!deadline) return false;
  return deadline < Date.now();
};

export const isDueToday = (deadline?: number): boolean => {
  if (!deadline) return false;
  const now = Date.now();
  const endOfDay = new Date().setHours(23, 59, 59, 999);
  return deadline >= now && deadline <= endOfDay;
};

export const isDueSoon = (deadline?: number, hoursThreshold: number = 24): boolean => {
  if (!deadline) return false;
  const now = Date.now();
  return deadline > now && deadline <= now + hoursThreshold * TIME_CONSTANTS.ONE_HOUR;
};
