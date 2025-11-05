import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, LanguageProvider, TodoProvider } from '@/context';
import { AppRouter } from '@/router/AppRouter';

import '@/i18n/config';
import './assets/global.css';

const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('p');
if (redirect) {
  window.history.replaceState(null, '', redirect);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/react-todo-list'>
    <ThemeProvider>
      <LanguageProvider>
        <TodoProvider>
          <AppRouter />
        </TodoProvider>
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
