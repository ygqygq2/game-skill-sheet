import { Box, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

import { RouterLink } from '@/components/core/link';
import { useColorMode } from '@/hooks/use-color-mode';
import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

interface GroupConfig {
  key: string;
  title: string;
  items: Omit<NavItemConfig, 'items'>[];
}

const groups: GroupConfig[] = [
  {
    key: 'group-0',
    title: '街机',
    items: [{ key: 'kof97', title: 'KOF97', href: paths.kof97 }],
  },
];

export function PagesPopover(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const textColor = colorMode === 'light' ? 'black' : 'white';

  return (
    <Box
      display="grid"
      backgroundColor="white"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      gap={3}
      gridTemplateColumns="repeat(2, 1fr)"
      p={3}
    >
      {groups.map((group) => (
        <Stack
          as="ul"
          key={group.key}
          gap={0.5}
          listStyleType="none"
          m={0}
          p={0}
        >
          <Stack
            as="li"
            gap={1}
          >
            <Box>
              <Box
                backgroundColor="white"
                border="1px"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="xs"
                display="inline-block"
                width="auto"
                p="6px 12px"
              >
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  lineHeight="28px"
                  color={textColor}
                >
                  {group.title}
                </Text>
              </Box>
            </Box>
            <Stack
              as="ul"
              gap={0.5}
              listStyleType="none"
              m={0}
              p={0}
            >
              {group.items.map((item) => (
                <li key={item.key}>
                  <LinkBox
                    as={item.href ? (item.external ? 'a' : RouterLink) : 'div'}
                    display="flex"
                    alignItems="center"
                    borderRadius="md"
                    p="6px 12px"
                    textDecoration="none"
                    whiteSpace="nowrap"
                    bgColor={item.disabled ? 'gray.200' : undefined}
                    color={item.disabled ? 'gray.400' : textColor}
                    cursor={item.disabled ? 'not-allowed' : 'pointer'}
                    _hover={item.disabled ? {} : { bgColor: 'gray.100' }}
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                    _focusVisible={{
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                  >
                    <Box flex="1">
                      <LinkOverlay
                        as={item.href ? (item.external ? 'a' : RouterLink) : 'div'}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          lineHeight="28px"
                        >
                          {item.title}
                        </Text>
                      </LinkOverlay>
                    </Box>
                  </LinkBox>
                </li>
              ))}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
