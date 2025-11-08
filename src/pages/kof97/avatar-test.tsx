import React, { useMemo } from 'react';
import { Box, Container, Grid, Heading, Text, Stack } from '@chakra-ui/react';
import { Kof97Avatar, Kof97AvatarSimple } from '@/components/kof97/kof97-avatar';

// 通过 Vite 的按需导入获取角色列表
const allCharJsonModules = import.meta.glob('/src/data/kof97/*.json', { eager: true, import: 'default' }) as Record<
  string,
  any
>;

function getNameFromPath(path: string): string {
  const matched = path.match(/\/src\/data\/kof97\/(.*)\.json$/);
  if (matched && matched[1] !== undefined) {
    return decodeURIComponent(matched[1] as string);
  }
  return path;
}

export function Kof97AvatarTest(): React.JSX.Element {
  const characters = useMemo(() => {
    return Object.entries(allCharJsonModules)
      .map(([path, json]) => {
        const name = getNameFromPath(path);
        const character = Array.isArray(json) ? json[0] : json;

        // 从 JSON 的 avatar.sprite 读取坐标
        let sprite = null;
        if (character?.avatar && typeof character.avatar === 'object' && character.avatar.sprite) {
          sprite = character.avatar.sprite;
        }

        return { name, sprite };
      })
      .filter((item) => item.sprite) // 只显示有 sprite 数据的角色
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Stack gap={8}>
          <Box>
            <Heading
              size="lg"
              mb={2}
            >
              KOF97 雪碧图头像测试
            </Heading>
            <Text color="gray.600">共 {characters.length} 个角色 · 雪碧图: /assets/kof97/avatars-sprite.png</Text>
          </Box>

          <Box>
            <Heading
              size="md"
              mb={4}
            >
              所有角色头像 (64px)
            </Heading>
            <Grid
              templateColumns="repeat(auto-fill, minmax(120px, 1fr))"
              gap={4}
            >
              {characters.map(({ name, sprite }) => (
                <Box
                  key={name}
                  textAlign="center"
                >
                  <Kof97Avatar
                    characterName={name}
                    size={64}
                    mx="auto"
                    border="2px solid"
                    borderColor="gray.200"
                    spriteOverride={sprite}
                  />
                  <Text
                    fontSize="sm"
                    mt={2}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {name}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box>
            <Heading
              size="md"
              mb={4}
            >
              不同尺寸测试
            </Heading>
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              {[32, 48, 64, 96].map((size) => (
                <Box key={size}>
                  <Text
                    fontSize="sm"
                    mb={2}
                    fontWeight="medium"
                  >
                    {size}px
                  </Text>
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
                    gap={2}
                  >
                    {characters.slice(0, 6).map(({ name, sprite }) => (
                      <Box
                        key={name}
                        textAlign="center"
                      >
                        <Kof97Avatar
                          characterName={name}
                          size={size}
                          mx="auto"
                          border="1px solid"
                          borderColor="gray.200"
                          spriteOverride={sprite}
                        />
                        <Text
                          fontSize="xs"
                          mt={1}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {name}
                        </Text>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box>
            <Heading
              size="md"
              mb={4}
            >
              原始雪碧图
            </Heading>
            <Box
              border="2px solid"
              borderColor="gray.300"
              borderRadius="md"
              overflow="hidden"
              display="inline-block"
            >
              <img
                src="/assets/kof97/avatars-sprite.png"
                alt="KOF97 Avatars Sprite"
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
