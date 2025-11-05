import fs from 'fs';
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-spa-fallback',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'docs');
        const notFoundPath = path.join(outDir, '404.html');
        const nojekyllPath = path.join(outDir, '.nojekyll');

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        const redirectScript = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      sessionStorage.setItem('redirectPath', window.location.pathname);
      window.location.replace('/react-todo-list/');
    </script>
  </head>
  <body>
  </body>
</html>`;

        fs.writeFileSync(notFoundPath, redirectScript);

        fs.writeFileSync(nojekyllPath, '');
      },
    },
  ],

  base: '/react-todo-list/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
