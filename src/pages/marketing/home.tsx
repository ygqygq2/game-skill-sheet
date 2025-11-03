import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { GamesSection } from '@/components/marketing/home/games-section';
import { Hero } from '@/components/marketing/home/hero';
import { config } from '@/config';
import type { Metadata } from '@/types/metadata';

const metadata = { title: config.site.name, description: config.site.description } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Hero />
        <GamesSection />
      </main>
    </React.Fragment>
  );
}
