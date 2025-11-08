import { Box, Card, Image, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  coverImage: string;
  link: string;
}

export function GameCard({ title, description, coverImage, link }: GameCardProps): React.JSX.Element {
  return (
    <Card.Root
      asChild
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: 'xl',
      }}
      cursor="pointer"
      maxW="600px"
      mx="auto"
    >
      <RouterLink to={link}>
        <Box
          position="relative"
          w="100%"
          h="300px"
          overflow="hidden"
          bg="gray.100"
          _dark={{ bg: 'gray.800' }}
        >
          <Image
            src={coverImage}
            alt={title}
            objectFit="fill"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
        </Box>
        <Card.Body p={6}>
          <Stack gap={3}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
            >
              {title}
            </Text>
            <Text
              color="gray.600"
              _dark={{ color: 'gray.400' }}
              fontSize="md"
            >
              {description}
            </Text>
          </Stack>
        </Card.Body>
      </RouterLink>
    </Card.Root>
  );
}
