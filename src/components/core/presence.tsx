import { Box } from '@chakra-ui/react';
import * as React from 'react';

type Size = 'small' | 'medium' | 'large';

type Status = 'online' | 'offline' | 'away' | 'busy';

const sizes = { small: 8, medium: 16, large: 24 };

export interface PresenceProps {
  size?: Size;
  status?: Status;
}

export function Presence({ size = 'medium', status = 'offline' }: PresenceProps): React.JSX.Element {
  const colors = {
    offline: 'var(--chakra-colors-gray-300)',
    away: 'var(--chakra-colors-yellow-400)',
    busy: 'var(--chakra-colors-red-500)',
    online: 'var(--chakra-colors-green-500)',
  } as Record<Status, string>;

  const color = colors[status];

  return (
    <Box
      sx={{
        bgcolor: color,
        borderRadius: '50%',
        display: 'inline-block',
        flex: '0 0 auto',
        height: sizes[size],
        width: sizes[size],
      }}
    />
  );
}
