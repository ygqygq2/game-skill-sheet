import { Box, IconButton, Image } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import * as React from 'react';

interface ImageCarouselProps {
  images: string[];
  basePath: string;
  alt: string;
  autoPlayInterval?: number; // 自动播放间隔（毫秒）
  width?: string;
  height?: string;
}

export function ImageCarousel({
  images,
  basePath,
  alt,
  autoPlayInterval = 3000,
  width = '300px',
  height = 'auto',
}: ImageCarouselProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // 自动轮播
  React.useEffect(() => {
    if (images.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isHovered]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleDotClick = React.useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  if (images.length === 0) {
    return <Box />;
  }

  if (images.length === 1) {
    return (
      <Image
        src={`${basePath}/${images[0]}`}
        alt={`${alt}-0`}
        width={width}
        height={height}
        objectFit="contain"
        loading="lazy"
        borderRadius="md"
        maxW={width}
      />
    );
  }

  return (
    <Box
      position="relative"
      width={width}
      maxW={width}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 主图片 */}
      <Image
        src={`${basePath}/${images[currentIndex]}`}
        alt={`${alt}-${currentIndex}`}
        width={width}
        height={height}
        objectFit="contain"
        loading="lazy"
        borderRadius="md"
        transition="opacity 0.3s"
      />

      {/* 左右切换按钮 */}
      <IconButton
        aria-label="上一张"
        position="absolute"
        left="8px"
        top="50%"
        transform="translateY(-50%)"
        onClick={handlePrev}
        size="sm"
        variant="solid"
        colorPalette="gray"
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.2s"
        bg="blackAlpha.600"
        color="white"
        _hover={{ bg: 'blackAlpha.800' }}
        borderRadius="full"
      >
        <Icon icon="mdi:chevron-left" />
      </IconButton>

      <IconButton
        aria-label="下一张"
        position="absolute"
        right="8px"
        top="50%"
        transform="translateY(-50%)"
        onClick={handleNext}
        size="sm"
        variant="solid"
        colorPalette="gray"
        opacity={isHovered ? 1 : 0}
        transition="opacity 0.2s"
        bg="blackAlpha.600"
        color="white"
        _hover={{ bg: 'blackAlpha.800' }}
        borderRadius="full"
      >
        <Icon icon="mdi:chevron-right" />
      </IconButton>

      {/* 底部指示点 */}
      <Box
        position="absolute"
        bottom="8px"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        gap="6px"
        bg="blackAlpha.500"
        px="8px"
        py="4px"
        borderRadius="full"
      >
        {images.map((_, index) => (
          <Box
            key={index}
            as="button"
            w="8px"
            h="8px"
            borderRadius="full"
            bg={currentIndex === index ? 'white' : 'whiteAlpha.500'}
            cursor="pointer"
            transition="all 0.2s"
            onClick={() => handleDotClick(index)}
            _hover={{
              bg: currentIndex === index ? 'white' : 'whiteAlpha.700',
              transform: 'scale(1.2)',
            }}
            aria-label={`切换到第 ${index + 1} 张`}
          />
        ))}
      </Box>

      {/* 图片计数 */}
      <Box
        position="absolute"
        top="8px"
        right="8px"
        bg="blackAlpha.600"
        color="white"
        px="8px"
        py="4px"
        borderRadius="md"
        fontSize="xs"
        fontWeight="medium"
      >
        {currentIndex + 1} / {images.length}
      </Box>
    </Box>
  );
}
