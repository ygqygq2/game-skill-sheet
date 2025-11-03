import { Stack } from '@chakra-ui/react';
import * as React from 'react';

export interface PropertyListProps {
  children: React.ReactNode;
  divider?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  stripe?: 'even' | 'odd';
}

export function PropertyList({
  children,
  divider,
  orientation = 'horizontal',
  stripe,
}: PropertyListProps): React.JSX.Element {
  return (
    <Stack
      divider={divider as React.ReactElement | undefined}
      direction={orientation === 'horizontal' ? 'row' : 'column'}
      gap="var(--PropertyList-gap)"
      sx={{
        '--PropertyItem-columns': orientation === 'horizontal' ? '150px minmax(0, 1fr)' : '1fr',
        ...(stripe && { [`& > *:nth-child(${stripe})`]: { bg: 'var(--chakra-colors-gray-50)' } }),
      }}
    >
      {children}
    </Stack>
  );
}
