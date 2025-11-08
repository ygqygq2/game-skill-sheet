import { Box, Button, Container, Stack, Text } from '@chakra-ui/react';
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
      <Container
        maxW="container.md"
        position="relative"
        py="60px"
        zIndex={3}
      >
        <Stack gap={3}>
          <Stack gap={2}>
            <Text
              fontSize="2.5rem"
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
