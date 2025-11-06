import { Box } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

import { Tooltip } from '@/components/ui/tooltip';

export function ScrollToTopButton(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      // 滚动超过一个视口高度时显示按钮
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Tooltip content="返回顶部">
      <Box
        as="button"
        onClick={scrollToTop}
        position="fixed"
        bottom="64px"
        right="16px"
        width="40px"
        height="40px"
        borderRadius="50%"
        border="none"
        cursor="pointer"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.900"
        color="white"
        zIndex={999}
        padding="10px"
        _hover={{
          bg: 'gray.700',
        }}
        transition="all 0.2s"
      >
        <Icon
          icon="mdi:chevron-up"
          width="20px"
          height="20px"
        />
      </Box>
    </Tooltip>
  );
}
