import { Badge, Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

import { RouterLink } from '@/components/core/link';
import { useSettings } from '@/hooks/use-settings';
import { paths } from '@/paths';

export function Features(): React.JSX.Element {
  const { settings } = useSettings();

  return (
    <Box pt="120px">
      <Stack gap={16}>
        <Stack
          maxWidth="700px"
          mx="auto"
          px={6}
        >
          <Stack gap={4}>
            <Box
              display="flex"
              justifyContent="center"
            >
              <Badge
                variant="solid"
                display="inline-flex"
                alignItems="center"
                px={2}
                py={1}
                borderRadius="md"
                textTransform="none"
              >
                <Icon
                  icon="ph:stack"
                  style={{ fontSize: '1rem', marginRight: '0.5rem' }}
                />
                Choose your stack
              </Badge>
            </Box>
            <Text
              textAlign="center"
              fontSize="2.25rem"
              fontWeight="500"
              lineHeight="1.2"
              as="h3"
            >
              And so much more
            </Text>
            <Text
              color="gray.500"
              textAlign="center"
            >
              All the features you need to build a better experience, explore the possibilities, and unlock the full
              potential of what we have to offer.
            </Text>
            <Box
              display="flex"
              justifyContent="center"
            >
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
                </RouterLink>
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Container maxW="container.md">
          <Image
            src="/assets/home-techs.svg"
            display="block"
            h="auto"
            w="100%"
          />
        </Container>
      </Stack>
    </Box>
  );
}
