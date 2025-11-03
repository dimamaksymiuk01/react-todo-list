import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { LanguageRedirect } from './LanguageRedirect';

import App from '@/App';

export const AppRouter: FC = () => {
  return (
    <>
      <LanguageRedirect />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/ua/*' element={<App />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
};
