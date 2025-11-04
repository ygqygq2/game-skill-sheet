import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useSettings } from '@/hooks/use-settings';
import { paths } from '@/paths';

export function Included(): React.JSX.Element {
  const { settings } = useSettings();

  return (
    <Box
      bg="gray.900"
      color="white"
      overflow="hidden"
      py="120px"
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
          w="400px"
        />
      </Box>
      <Stack
        gap={8}
        position="relative"
        zIndex={1}
      >
        <Container maxW="container.md">
          <Stack gap={2}>
            <Text
              color="inherit"
              textAlign="center"
              fontSize="4xl"
            >
              What can you expect
            </Text>
            <Text
              color="gray.300"
              textAlign="center"
            >
              All the resources you need to build a better experience
            </Text>
          </Stack>
        </Container>
        <Container maxW="container.lg">
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={6}
          >
            <GridItem colSpan={[12, 12, 4]}>
              <Stack gap={2}>
                <Box>
                  <Badge
                    variant="solid"
                    colorPalette={settings.primaryColor}
                    display="inline-flex"
                    alignItems="center"
                    px={2}
                    py={1}
                    borderRadius="md"
                    textTransform="none"
                  >
                    <Icon
                      icon="ph:lightning"
                      style={{ marginRight: '8px', fontSize: '1rem' }}
                    />
                    Quality widgets
                  </Badge>
                </Box>
                <Text
                  fontSize="4xl"
                  color="inherit"
                >
                  游戏出招表
                </Text>
                <Text color="inherit">
                  我们提供详细的游戏角色出招表，帮助您快速查询和掌握各个角色的招式技能。
                  浏览角色列表，查看完整的技能详情。
                </Text>
                <div>
                  <Button
                    as={RouterLink}
                    to={paths.kof97}
                    variant="containedSecondary"
                    size="md"
                  >
                    立即查看
                  </Button>
                </div>
              </Stack>
            </GridItem>
            <GridItem colSpan={[12, 12, 8]}>
              <Box
                maxW="100%"
                w="390px"
                m="auto"
                position="relative"
              >
                <Box
                  bg="#8057f4"
                  position="absolute"
                  top={0}
                  bottom={0}
                  left="15%"
                  right={0}
                  filter="blur(50px)"
                  transform="rotate(-169deg)"
                  zIndex={0}
                />
                <Image
                  src="/assets/home-widgets.png"
                  h="auto"
                  w="100%"
                  position="relative"
                  zIndex={1}
                  alt="Widgets"
                />
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Stack>
    </Box>
  );
}
