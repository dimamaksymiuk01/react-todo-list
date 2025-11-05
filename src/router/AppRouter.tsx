import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import App from '@/App';

export const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/ua' element={<App />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
