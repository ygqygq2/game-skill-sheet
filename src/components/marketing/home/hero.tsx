import { Avatar, Box, Button, Container, Image, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useSettings } from '@/hooks/use-settings';
import { paths } from '@/paths';

export function Hero(): React.JSX.Element {
  const { settings } = useSettings();

  return (
    <Box
      bg="gray.900"
      color="white"
      overflow="hidden"
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={0}
      >
        <Image
          src="/assets/home-cosmic.svg"
          h="auto"
          w="1600px"
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={1}
      >
        <Image
          src="/assets/home-rectangles.svg"
          h="auto"
          w="1900px"
        />
      </Box>
      <Container
        maxW="container.md"
        position="relative"
        py="120px"
        zIndex={3}
      >
        <Stack gap={4}>
          <Stack gap={2}>
            <Text
              fontSize="3.5rem"
              fontWeight="600"
              lineHeight="1.2"
              textAlign="center"
            >
              游戏出招表{' '}
              <Text
                color={`${settings.primaryColor}.500`}
                as="span"
              >
                攻略大全
              </Text>
            </Text>
            <Text
              color="gray.300"
              fontWeight="400"
              textAlign="center"
            >
              专业的格斗游戏出招表查询平台，收录经典格斗游戏技能资料，让你快速掌握每个角色的招式技巧
            </Text>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            justifyContent="center"
          >
            <Button
              asChild
              variant="solid"
              colorPalette={settings.primaryColor}
            >
              <RouterLink to={paths.kof97}>开始查询</RouterLink>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
