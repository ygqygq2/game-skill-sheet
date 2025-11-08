import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = __dirname;

export default defineConfig(({ command }) => {
  // 从环境变量获取 base path，支持任意子目录部署（GitHub Pages、Vercel、自定义域名等）
  // CI 环境会通过 BASE_PATH 传入，本地开发默认 /
  const basePath = process.env.BASE_PATH || '/';

  return {
    root,
    // dev 和 prod 都使用相同逻辑：优先环境变量，否则默认根路径
    base: basePath,
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
