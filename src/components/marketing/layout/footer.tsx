import { Box, Container, Flex, Grid, Link, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

interface GroupConfig {
  key: string;
  title: string;
  items: NavItemConfig[];
}

const groups = [
  {
    key: 'kof97',
    title: 'KOF97',
    items: [
      { key: 'characters', title: '角色列表', href: paths.kof97 },
      { key: 'skills', title: '出招表', href: paths.kof97 },
    ],
  },
  {
    key: 'about',
    title: '关于',
    items: [
      { key: 'about-us', title: '关于我们', href: paths.home },
      { key: 'contact', title: '联系方式', href: paths.home },
    ],
  },
  {
    key: 'social',
    title: '社交',
    items: [
      { key: 'github', title: 'GitHub', href: 'https://github.com/ygqygq2', external: true },
      { key: 'blog', title: '博客', href: 'https://blog.ygqygq2.com', external: true },
    ],
  },
] satisfies GroupConfig[];

export function Footer(): React.JSX.Element {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="gray.200"
      pb={12}
      pt={{ base: '48px', md: '120px' }}
    >
      <Container maxW="container.lg">
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
          gap={6}
        >
          <Box order={{ base: 4, md: 1 }}>
            <Stack
              gap={2}
              direction="column"
            >
              <DynamicLogo
                colorDark="light"
                colorLight="dark"
                height={8}
                width={122}
              />
              <Text
                color="gray.500"
                fontSize="xs"
              >
                © 2024 游戏出招表
              </Text>
            </Stack>
          </Box>
          {groups.map((section, index) => (
            <Box
              key={section.key}
              order={{ base: index + 1, md: index + 2 }}
            >
              <Text
                color="gray.500"
                textTransform="uppercase"
                fontSize="xs"
              >
                {section.title}
              </Text>
              <Stack
                as="ul"
                gap={1}
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
              >
                {section.items.map((item) => (
                  <NavItem
                    {...item}
                    key={item.key}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Grid>
        <Box
          borderTop="1px solid"
          borderColor="gray.200"
          my={12}
        />
        <Text
          color="gray.500"
          fontSize="xs"
        >
          All Rights Reserved.
        </Text>
      </Container>
    </Box>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavItemProps extends NavItemConfig {}

function NavItem({ href, external, title }: NavItemProps): React.JSX.Element {
  return (
    <Stack
      direction="row"
      key={title}
      gap={2}
      align="center"
    >
      <Box
        bg="blue.500"
        height="2px"
        width="12px"
      />
      <Link
        {...(href ? (external ? { href, isExternal: true } : { as: RouterLink, to: href }) : {})}
        color="gray.700"
        fontSize="sm"
      >
        {title}
      </Link>
    </Stack>
  );
}
