import { Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

export interface TipProps {
  message: string;
}

export function Tip({ message }: TipProps): React.JSX.Element {
  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ alignItems: 'center', bgcolor: 'var(--chakra-colors-gray-500)', borderRadius: 1, p: 1 }}
    >
      <Icon icon="ph:lightbulb" />
      <Text
        color="text.secondary"
        variant="caption"
      >
        <Text
          as="span"
          sx={{ fontWeight: 700 }}
          variant="inherit"
        >
          Tip.
        </Text>{' '}
        {message}
      </Text>
    </Stack>
  );
}
