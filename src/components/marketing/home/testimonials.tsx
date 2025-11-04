'use client';

import { Badge, Box, Container, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import * as React from 'react';

const reviews = [
  {
    id: 'REV-5',
    author: 'Laurent B.',
    comment:
      'I keep buying new versions of the template because it is so good and the team at Devias keeps updating it following design trends and updates to NextJS and other libraries [...]',
  },
  {
    id: 'REV-4',
    author: 'Ali Hassan E.',
    comment:
      'I am very happy with the Devias template that I purchased. The team at Devias was very responsive and helpful before and after I bought the template. They were always quick to respond to my questions and they provided excellent customer support.',
  },
  {
    id: 'REV-3',
    author: 'Yossi T.',
    comment:
      'All in all amazing product, clean, bug-free, one of the FASTEST customer support products I have encountered in my life. Very high quality template, all written in a super clean and orgenized way. Highly recommended!',
  },
  {
    id: 'REV-2',
    author: 'Yossi T.',
    comment:
      'All in all amazing product, clean, bug-free, one of the FASTEST customer support products I have encountered in my life. Very high quality template, all written in a super clean and orgenized way. Highly recommended!',
  },
  {
    id: 'REV-1',
    author: 'Chris V.',
    comment: 'Best template out there. I purchase this every year. It saves a ton of time.',
  },
] as const;

export function Testimonails(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Box
      bg="var(--chakra-colors-gray-50)"
      borderTop="1px"
      borderColor="var(--chakra-colors-gray-200)"
      pt="120px"
    >
      <Container maxW="container.md">
        <VStack gap={16}>
          <VStack gap={4}>
            <Box>
              <Badge
                variant="primary"
                display="inline-flex"
                alignItems="center"
                px={2}
                py={1}
                borderRadius="md"
                textTransform="none"
              >
                <IconifyIcon
                  icon="ph:users"
                  style={{ fontSize: '1rem', marginRight: '0.5rem' }}
                />
                Features
              </Badge>
            </Box>
            <Text
              textAlign="center"
              fontSize="2.25rem"
              fontWeight="500"
              lineHeight="1.2"
            >
              What are people saying
            </Text>
          </VStack>
          <VStack gap={6}>
            <Box
              ref={emblaRef}
              overflow="hidden"
            >
              <HStack gap="1rem">
                {reviews.map((review) => (
                  <VStack
                    key={review.id}
                    gap={2}
                    flex="0 0 100%"
                    minWidth="0"
                    position="relative"
                  >
                    <Text
                      color="gray.500"
                      textAlign="center"
                    >
                      {review.comment}
                    </Text>
                    <Text textAlign="center">{review.author}</Text>
                  </VStack>
                ))}
              </HStack>
            </Box>
            <HStack
              gap={4}
              alignItems="center"
              width="100%"
            >
              <IconButton
                aria-label="Scroll"
                isDisabled={prevBtnDisabled}
                onClick={scrollPrev}
              >
                <IconifyIcon
                  icon="ph:caret-left"
                  style={{ fontSize: '2em' }}
                />
              </IconButton>
              <HStack
                gap="2"
                flex="1 1 auto"
                justifyContent="center"
              >
                {scrollSnaps.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => {
                      scrollTo(index);
                    }}
                    bg={index === selectedIndex ? 'var(--chakra-colors-blue-500)' : 'var(--chakra-colors-gray-200)'}
                    borderRadius="full"
                    cursor="pointer"
                    h="2"
                    mx="1"
                    w="2"
                  />
                ))}
              </HStack>
              <IconButton
                aria-label="Scroll"
                isDisabled={nextBtnDisabled}
                onClick={scrollNext}
              >
                <IconifyIcon
                  icon="ph:caret-right"
                  style={{ fontSize: '2em' }}
                />
              </IconButton>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
