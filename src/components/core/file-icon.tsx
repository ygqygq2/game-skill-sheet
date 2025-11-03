import { Box } from '@chakra-ui/react';
import * as React from 'react';

const icons: Record<string, string> = {
  jpeg: '/assets/icon-jpg.svg',
  jpg: '/assets/icon-jpg.svg',
  mp4: '/assets/icon-mp4.svg',
  pdf: '/assets/icon-pdf.svg',
  png: '/assets/icon-png.svg',
  svg: '/assets/icon-svg.svg',
};

export interface FileIconProps {
  extension?: string;
}

export function FileIcon({ extension }: FileIconProps): React.JSX.Element {
  let icon: string;

  if (!extension) {
    icon = '/assets/icon-other.svg';
  } else {
    icon = icons[extension] ?? '/assets/icon-other.svg';
  }

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flex="0 0 auto"
      w="48px"
      h="48px"
    >
      <Box
        as="img"
        alt="File"
        src={icon}
        h="100%"
        w="auto"
      />
    </Box>
  );
}
