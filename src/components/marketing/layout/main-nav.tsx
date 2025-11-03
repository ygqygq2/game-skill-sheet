import { Box, Container, IconButton, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

import { Dropdown, DropdownPopover, DropdownTrigger } from '@/components/core/dropdown';
import { RouterLink } from '@/components/core/link';
import { Logo } from '@/components/core/logo';
import { useColors } from '@/hooks/use-colors';
import { usePathname } from '@/hooks/use-pathname';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

import { MobileNav } from './mobile-nav';
import { PagesPopover } from './pages-popover';

export function MainNav(): React.JSX.Element {
  const colors = useColors();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const pathname = usePathname();
  const neutral = (colors as any)?.palette?.neutral || (colors as any)?.palette?.secondary;
  const headerBg = neutral?.[950] || '#0b0d11';

  return (
    <React.Fragment>
      <Box
        as="header"
        bg={headerBg}
        color="white"
        left={0}
        position="sticky"
        right={0}
        top={0}
        zIndex="var(--MainNav-zIndex)"
        boxShadow="0 1px 0 rgba(255,255,255,0.04)"
      >
        <Container
          maxW="container.lg"
          px={{ base: 4, md: 8 }}
          display="flex"
          justifyContent="space-between"
          h="var(--MainNav-height)"
          py="16px"
        >
          <Box>
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
            >
              <Box
                display="inline-flex"
                height="32px"
                width="128px"
              >
                <RouterLink
                  href={paths.home}
                  style={{ display: 'inline-flex', height: '100%', width: '100%' }}
                >
                  <Logo
                    color="light"
                    height="100%"
                    width="100%"
                  />
                </RouterLink>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
            >
              <Box
                as="nav"
                display={{ base: 'none', md: 'inline-block' }}
              >
                <Stack
                  as="ul"
                  direction="row"
                  gap={1}
                  listStyleType="none"
                  m={0}
                  p={0}
                >
                  <NavItem
                    pathname={pathname}
                    title="游戏列表"
                  >
                    <PagesPopover />
                  </NavItem>
                </Stack>
              </Box>
              <IconButton
                aria-label="Open"
                onClick={() => setMobileNavOpen(true)}
                color="white"
                fontSize="24px"
                bg="transparent"
                border="0"
                p="0"
                display={{ base: 'flex', md: 'none' }}
              >
                <Icon icon="ph:list" />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>
      <MobileNav
        onClose={() => setMobileNavOpen(false)}
        open={mobileNavOpen}
      />
    </React.Fragment>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'key' | 'items'> {
  children?: React.ReactNode;
  pathname: string;
}

export function NavItem({
  children,
  disabled,
  external,
  href,
  matcher,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const colors = useColors();
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(children);
  const neutral = (colors as any)?.palette?.neutral || (colors as any)?.palette?.secondary;
  const primary = (colors as any)?.palette?.primary;
  const defaultColor = neutral?.[300] || 'rgba(255,255,255,0.72)';
  const activeText = 'white';

  const buttonElement = (
    <Box
      {...(hasPopover
        ? {
            onClick: (event: React.MouseEvent<HTMLElement>): void => {
              event.preventDefault();
            },
            role: 'button',
          }
        : {
            ...(href
              ? external
                ? {
                    as: 'a',
                    href,
                    target: '_blank',
                    rel: 'noreferrer',
                  }
                : {
                    as: RouterLink,
                    href,
                  }
              : { role: 'button' }),
          })}
      alignItems="center"
      borderRadius="md"
      display="flex"
      flex="0 0 auto"
      gap={1}
      p="6px 16px"
      textAlign="left"
      textDecoration="none"
      whiteSpace="nowrap"
      position="relative"
      bgColor={disabled ? 'transparent' : undefined}
      color={disabled ? defaultColor : active ? activeText : defaultColor}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={{
        color: !disabled ? activeText : undefined,
        bgColor: !disabled && !active ? 'rgba(255,255,255,0.04)' : undefined,
      }}
      _focus={{
        outline: 'none',
      }}
      _focusVisible={{
        outline: 'none',
        boxShadow: 'none',
      }}
      _after={
        active
          ? {
              content: '""',
              position: 'absolute',
              left: '12px',
              right: '12px',
              bottom: '6px',
              height: '2px',
              borderRadius: '1px',
              background: primary?.main || '#6366f1',
            }
          : undefined
      }
      tabIndex={0}
    >
      <Box
        as="span"
        flex="1 1 auto"
      >
        <Text
          as="span"
          color="inherit"
          fontSize="sm"
          fontWeight="semibold"
          lineHeight="28px"
        >
          {title}
        </Text>
      </Box>
      {hasPopover ? (
        <Box
          alignItems="center"
          color="inherit"
          display="flex"
          flex="0 0 auto"
        >
          <Icon
            icon="ph:caret-down"
            fontSize="sm"
          />
        </Box>
      ) : null}
    </Box>
  );

  if (hasPopover) {
    return (
      <Box
        as="li"
        userSelect="none"
      >
        <Dropdown
          delay={150}
          placement="bottom"
          gutter={0}
        >
          <DropdownTrigger>{buttonElement}</DropdownTrigger>
          <DropdownPopover
            width="800px"
            animationDuration="slow"
            contentStyles={{
              _focus: {
                outline: 'none',
                boxShadow: 'none',
              },
            }}
          >
            {children}
          </DropdownPopover>
        </Dropdown>
      </Box>
    );
  }

  return (
    <Box
      as="li"
      userSelect="none"
    >
      {buttonElement}
    </Box>
  );
}
