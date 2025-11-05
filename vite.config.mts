import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = __dirname;

export default defineConfig(({ command }) => {
  return {
    root,
    // dev 环境使用 /，prod 环境使用 './'
    base: command === 'serve' ? '/' : './',
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1'),
        },
        {
          find: /^@\/(.+)/,
          replacement: path.join(process.cwd(), 'src/$1'),
        },
      ],
    },
    server: {
      port: parseInt(process.env?.VITE_APP_PORT || '3000'),
    },
    preview: {
      port: 3000,
    },
  };
});
