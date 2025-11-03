import fs from 'fs';
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),

    {
      name: 'create-404-redirect',
      closeBundle() {
        const outDir = path.resolve(__dirname, 'docs');
        const file = path.join(outDir, '404.html');

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        fs.writeFileSync(
          file,
          `<meta http-equiv="refresh" content="0; url=/react-todo-list/" />`,
        );
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
