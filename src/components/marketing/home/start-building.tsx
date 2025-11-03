'use client';

import { Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

import { NoSsr } from '@/components/core/no-ssr';
import { RouterLink } from '@/components/core/link';
import { useColorModeValue } from '@/hooks/use-color-mode';
import { paths } from '@/paths';
import { useSettings } from '@/hooks/use-settings';

export function StartBuilding(): React.JSX.Element {
  const colorScheme = useColorModeValue('light', 'dark');
  const { settings } = useSettings();

  return (
    <Box
      bg="gray.50"
      pb="60px"
    >
      <Container maxWidth={{ base: '100%', sm: '600px', md: '1200px' }}>
        <Box
          borderRadius="20px"
          border="1px solid transparent"
          color="white"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          overflow="hidden"
          position="relative"
        >
          <Box
            bg="gray.900"
            borderRadius="20px"
            bottom="1px"
            left="-1px"
            position="absolute"
            right="1px"
            top="-1px"
            zIndex={0}
          >
            <Box
              alignItems="center"
              bottom={0}
              display="flex"
              justifyContent="center"
              left={0}
              position="absolute"
              right={0}
              top={0}
              zIndex={0}
            >
              <Image
                src="/assets/home-cosmic.svg"
                height="auto"
                width="1600px"
              />
            </Box>
            <Box
              alignItems="center"
              bottom={0}
              display="flex"
              justifyContent="center"
              left={0}
              position="absolute"
              right={0}
              top={0}
              zIndex={1}
            >
              <Image
                src="/assets/home-rectangles.svg"
                height="auto"
                width="1900px"
              />
            </Box>
          </Box>
          <Stack
            gap={3}
            flex="0 1 auto"
            position="relative"
            px="64px"
            py="120px"
            width={{ base: '100%', md: '45%' }}
            zIndex={1}
          >
            <Stack gap={2}>
              <Text
                color="inherit"
                fontSize="3xl"
              >
                Start building today.
              </Text>
              <Text color="gray.300">
                Focus on building your app, not on integrating APIs. The kit provides the essential code you need to
                launch quickly.
              </Text>
            </Stack>
            <div>
              <Button
                asChild
                variant="solid"
                colorPalette={settings.primaryColor}
              >
                <RouterLink
                  href={paths.purchase}
                  target="_blank"
                >
                  Purchase now
                  <Icon
                    icon="ph:caret-right"
                    style={{ fontSize: '1.2em', marginLeft: '0.5rem' }}
                  />
                </RouterLink>
              </Button>
            </div>
          </Stack>
          <Box
            alignItems={{ base: 'flex-end', md: 'stretch' }}
            borderRadius="20px"
            display="flex"
            flex="1 1 auto"
            flexDirection="column"
            justifyContent="flex-end"
            pl={{ base: '64px', md: 0 }}
            position="relative"
            zIndex={2}
          >
            <NoSsr>
              <Box
                height="340px"
                position="relative"
                width={{ base: '80%', md: '100%' }}
              >
                <Box
                  bg="#8057f4"
                  filter="blur(50px)"
                  height="40px"
                  left={0}
                  position="absolute"
                  right={0}
                  top={0}
                  zIndex={0}
                />
                <Box
                  height="100%"
                  position="relative"
                  width="100%"
                  zIndex={1}
                >
                  <Image
                    src={colorScheme === 'dark' ? '/assets/home-cta-dark.png' : '/assets/home-cta-light.png'}
                    display="block"
                    bottom="1px"
                    height="100%"
                    left={0}
                    position="absolute"
                    width="auto"
                  />
                </Box>
              </Box>
            </NoSsr>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
