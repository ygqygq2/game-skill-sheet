import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '../config';
import type { Metadata } from '../types/metadata';

const metadata = { title: `Not found | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
    </React.Fragment>
  );
}
