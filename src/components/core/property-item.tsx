import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface PropertyItemProps {
  name: string;
  value: string | React.ReactNode;
}

export function PropertyItem({ name, value }: PropertyItemProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gridGap: 'var(--PropertyItem-gap, 8px)',
        gridTemplateColumns: 'var(--PropertyItem-columns)',
        p: 'var(--PropertyItem-padding, 8px)',
      }}
    >
      <div>
        <Text
          color="text.secondary"
          variant="body2"
        >
          {name}
        </Text>
      </div>
      <div>
        {typeof value === 'string' ? (
          <Text
            color={value ? 'text.primary' : 'text.secondary'}
            variant="subtitle2"
          >
            {value || 'None'}
          </Text>
        ) : (
          <React.Fragment>{value}</React.Fragment>
        )}
      </div>
    </Box>
  );
}
