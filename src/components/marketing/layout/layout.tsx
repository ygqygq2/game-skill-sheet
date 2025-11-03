import { Box } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import * as React from 'react';

import { Footer } from '@/components/marketing/layout/footer';
import { MainNav } from '@/components/marketing/layout/main-nav';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box>
      <Global
        styles={css`
          body {
            --MainNav-height: 72px;
            --MainNav-zIndex: 1000;
            --SideNav-width: 280px;
            --SideNav-zIndex: 1100;
            --MobileNav-width: 320px;
            --MobileNav-zIndex: 1100;
          }
        `}
      />
      <MainNav />
      {children}
      <Footer />
    </Box>
  );
}
