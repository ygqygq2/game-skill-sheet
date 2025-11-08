import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Layout as MarketingLayout } from '@/components/marketing/layout/layout';
import { Page as HomePage } from '@/pages/marketing/home';
import { Page as NotFoundPage } from '@/pages/not-found';

export const routes: RouteObject[] = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'kof97',
        lazy: async () => {
          const { Page } = await import('@/pages/kof97');
          return { Component: Page };
        },
      },
      {
        path: 'kof97/sprite-tune',
        lazy: async () => {
          const { Kof97SpriteTune } = await import('@/pages/kof97/sprite-tune');
          return { Component: Kof97SpriteTune };
        },
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];
