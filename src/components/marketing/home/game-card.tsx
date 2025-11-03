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
    >
      <RouterLink to={link}>
        <Box
          position="relative"
          h="240px"
          overflow="hidden"
        >
          <Image
            src={coverImage}
            alt={title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)"
          />
        </Box>
        <Card.Body>
          <Stack gap={2}>
            <Text
              fontSize="xl"
              fontWeight="bold"
            >
              {title}
            </Text>
            <Text
              color="gray.600"
              _dark={{ color: 'gray.400' }}
            >
              {description}
            </Text>
          </Stack>
        </Card.Body>
      </RouterLink>
    </Card.Root>
  );
}
