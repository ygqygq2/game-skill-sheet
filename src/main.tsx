import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { Root } from './root';
import { routes } from './routes';

const container = document.getElementById('root');

const root = createRoot(container!);

// 获取 base path，支持任意目录部署
const basename = import.meta.env.BASE_URL || '/';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <Root>
          <Outlet />
        </Root>
      ),
      children: [...routes],
    },
  ],
  {
    basename,
  }
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
