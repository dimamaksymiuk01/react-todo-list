import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { LanguageProvider } from '@/context/LanguageContext/LanguageContext';
import { AppRouter } from '@/router/AppRouter';
import '@/i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
