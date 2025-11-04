import { Box, Drawer, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

import { DynamicLogo } from '@/components/core/logo';
import { useColorMode } from '@/hooks/use-color-mode';
import { usePathname } from '@/hooks/use-pathname';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { paths } from '@/paths';
import type { NavItemConfig } from '@/types/nav';

// NOTE: First level elements are groups.

const navItems = [
  {
    key: 'group-0',
    items: [
      { key: 'home', title: '首页', href: paths.home },
      {
        key: 'kof97',
        title: 'KOF97',
        items: [{ key: 'skills', title: '出招表', href: paths.kof97 }],
      },
    ],
  },
] satisfies NavItemConfig[];

interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function MobileNav({ onClose, open }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Drawer.Root
      placement="end"
      open={open || false}
    >
      <Drawer.Backdrop />
      <Drawer.Content>
        <Drawer.CloseTrigger />
        <Drawer.Body>
          <Stack
            direction="row"
            gap={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Link
              href={paths.home}
              display="inline-flex"
            >
              <DynamicLogo
                colorDark="light"
                colorLight="dark"
                height={32}
                width={122}
              />
            </Link>
            <IconButton
              aria-label="Close"
              onClick={onClose}
              icon={
                <Icon
                  icon="ph:x"
                  fontSize="1.2em"
                />
              }
            />
          </Stack>
          <Box as="nav">
            <Stack
              as="ul"
              gap={1}
              listStyleType="none"
              m={0}
              p={0}
            >
              {renderNavGroups({ items: navItems, onClose, pathname })}
            </Stack>
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

function renderNavGroups({
  items,
  onClose,
  pathname,
}: {
  items: NavItemConfig[];
  onClose?: () => void;
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    acc.push(
      <Stack
        as="li"
        key={curr.key}
        gap={1.5}
      >
        {curr.title ? (
          <Box>
            <Text
              color="gray.500"
              fontSize="sm"
              fontWeight="semibold"
            >
              {curr.title}
            </Text>
          </Box>
        ) : null}
        <Box>{renderNavItems({ depth: 0, items: curr.items, onClose, pathname })}</Box>
      </Stack>
    );

    return acc;
  }, []);

  return (
    <Stack
      as="ul"
      gap={2}
      listStyleType="none"
      m={0}
      p={0}
    >
      {children}
    </Stack>
  );
}

function renderNavItems({
  depth = 0,
  items = [],
  onClose,
  pathname,
}: {
  depth: number;
  items?: NavItemConfig[];
  onClose?: () => void;
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem
        depth={depth}
        forceOpen={forceOpen}
        key={key}
        onClose={onClose}
        pathname={pathname}
        {...item}
      >
        {childItems ? renderNavItems({ depth: depth + 1, items: childItems, onClose, pathname }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <Stack
      as="ul"
      data-depth={depth}
      gap={1}
      listStyleType="none"
      m={0}
      p={0}
    >
      {children}
    </Stack>
  );
}
interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  children?: React.ReactNode;
  depth: number;
  forceOpen?: boolean;
  onClose?: () => void;
  pathname: string;
}

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  matcher,
  onClose,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(forceOpen);
  const { colorMode } = useColorMode();
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const ExpandIcon = open ? (
    <Icon
      icon="ph:caret-down"
      fontSize="1.2em"
    />
  ) : (
    <Icon
      icon="ph:caret-right"
      fontSize="1.2em"
    />
  );
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);

  const color = colorMode === 'light' ? 'gray.800' : 'white';
  const hoverBg = colorMode === 'light' ? 'gray.100' : 'gray.700';
  const _activeColor = colorMode === 'light' ? 'white' : 'gray.800';
  const activeBg = colorMode === 'light' ? 'blue.600' : 'blue.500';

  return (
    <Box
      as="li"
      data-depth={depth}
      userSelect="none"
    >
      <Box
        {...(isBranch
          ? {
              onClick: (): void => {
                setOpen(!open);
              },
              onKeyUp: (event: React.KeyboardEvent<HTMLElement>): void => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setOpen(!open);
                }
              },
              role: 'button',
            }
          : {
              ...(href
                ? {
                    as: external ? 'a' : Link,
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noreferrer' : undefined,
                    onClick: (): void => {
                      onClose?.();
                    },
                  }
                : { role: 'button' }),
            })}
        alignItems="center"
        borderRadius="md"
        color={color}
        cursor="pointer"
        display="flex"
        p={3}
        textDecoration="none"
        bgColor={active ? activeBg : undefined}
        _hover={{
          bgColor: !disabled && !active ? hoverBg : undefined,
        }}
        tabIndex={0}
      >
        <Box flex="1">
          <Text
            fontSize="sm"
            fontWeight="semibold"
          >
            {title}
          </Text>
        </Box>
        {isBranch ? (
          <IconButton
            aria-label="Expand"
            icon={ExpandIcon}
          />
        ) : null}
      </Box>
      {showChildren ? <Box pl={5}>{children}</Box> : null}
    </Box>
  );
}
