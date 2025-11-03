import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, LanguageProvider, TodoProvider } from '@/context';
import { AppRouter } from '@/router/AppRouter';

import '@/i18n/config';
import './assets/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <TodoProvider>
            <AppRouter />
          </TodoProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
