import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = __dirname;

export default defineConfig(({ command }) => {
  // 从环境变量获取 base path，支持 GitHub Pages 非根目录部署
  const basePath = process.env.BASE_PATH || '/';

  return {
    root,
    // dev 环境使用 /，prod 环境使用环境变量中的 base path 或相对路径
    base: command === 'serve' ? '/' : basePath,
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
