import { Box, Container, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';

import { paths } from '@/paths';

import { GameCard } from './game-card';

const games = [
  {
    id: 'kof97',
    title: 'The King of Fighters 97',
    description: '拳皇97 - 经典格斗游戏,收录全部角色出招表及连招技巧',
    coverImage: '/assets/kof97/kof97-title.png', // 使用本地路径，不走 CDN
    link: paths.kof97,
  },
];

export function GamesSection(): React.JSX.Element {
  return (
    <Box
      bg="white"
      _dark={{ bg: 'gray.950' }}
      py="40px"
    >
      <Container maxW="container.xl">
        <Stack gap={8}>
          <Stack
            gap={2}
            textAlign="center"
          >
            <Heading
              as="h2"
              size="xl"
            >
              游戏列表
            </Heading>
            <Text
              color="gray.600"
              _dark={{ color: 'gray.400' }}
              fontSize="md"
            >
              选择你想查看出招表的游戏
            </Text>
          </Stack>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
            }}
            gap={8}
          >
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                coverImage={game.coverImage}
                link={game.link}
              />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
