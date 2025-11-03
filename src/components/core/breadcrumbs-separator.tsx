import { Box } from '@chakra-ui/react';
import * as React from 'react';

export function BreadcrumbsSeparator(): React.JSX.Element {
  return (
    <Box
      bg="gray.500"
      borderRadius="full"
      h="4px"
      w="4px"
    />
  );
}
