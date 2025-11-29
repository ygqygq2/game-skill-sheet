import { Box, Button, Container, Heading, HStack, Image, Separator, Stack, Table, Tag, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageCarousel } from '@/components/core/image-carousel';
import { Kof97Avatar } from '@/components/kof97/kof97-avatar';
import type { SpritePosition } from '@/config/kof97-sprite';
import { useSettings } from '@/hooks/use-settings';
import { getAssetUrl } from '@/lib/get-asset-url';

// Types for data
interface Skill {
  name: string;
  type: string;
  command: string;
  description?: string;
  images?: string[];
}

interface Character {
  name: string;
  skills: Skill[];
  avatar?: string | { sprite?: SpritePosition };
}

function hasSprite(a: Character['avatar']): a is { sprite: SpritePosition } {
  return !!a && typeof a === 'object' && 'sprite' in a && !!(a as any).sprite;
}

// Load all character json files under src/data/kof97
function useKof97Data() {
  // Using Vite's glob import to eagerly load JSON files
  const modules = React.useMemo<Record<string, { default: Array<Character> }>>(
    () => import.meta.glob<{ default: Array<Character> }>('@/data/kof97/*.json', { eager: true }),
    []
  );

  const characters = React.useMemo<Character[]>(() => {
    const list: Character[] = [];
    for (const key of Object.keys(modules)) {
      const mod = modules[key];
      const arr = (mod?.default ?? []) as Array<Character>;
      if (Array.isArray(arr) && arr.length > 0 && arr[0]) {
        // Files are arrays with a single character object
        list.push(arr[0] as Character);
      }
    }
    // Sort by name for stable UI
    return list.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'));
  }, [modules]);

  return { characters };
}

const SKILLS_PAGE_SIZE = 3; // 每次加载3个技能

export function CharacterPage(): React.JSX.Element {
  const { characterName } = useParams<{ characterName: string }>();
  const { characters } = useKof97Data();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [visibleSkillsCount, setVisibleSkillsCount] = React.useState<number>(SKILLS_PAGE_SIZE);
  const skillsSentinelRef = React.useRef<HTMLDivElement | null>(null);

  const character = React.useMemo(() => {
    if (!characterName) return characters[0];
    return characters.find((c) => c.name === decodeURIComponent(characterName)) || characters[0];
  }, [characters, characterName]);

  const allNames = React.useMemo(() => characters.map((c) => c.name), [characters]);

  // Reset visible skills count when character changes
  React.useEffect(() => {
    setVisibleSkillsCount(SKILLS_PAGE_SIZE);
  }, [character?.name]);

  // IntersectionObserver for lazy loading skills
  React.useEffect(() => {
    if (!skillsSentinelRef.current || !character) return;
    const el = skillsSentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisibleSkillsCount((prev) => {
            if (prev >= character.skills.length) return prev;
            return Math.min(prev + SKILLS_PAGE_SIZE, character.skills.length);
          });
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [character]);

  const visibleSkills = character ? character.skills.slice(0, visibleSkillsCount) : [];

  if (!character) {
    return (
      <Box p={8}>
        <Text>角色未找到</Text>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{character.name} - 拳皇97 出招表</title>
      </Helmet>
      <Box
        bg="white"
        _dark={{ bg: 'gray.950' }}
        py={{ base: 6, md: 10 }}
      >
        <Container maxW="container.xl">
          <Stack gap={6}>
            <Heading
              as="h1"
              size="2xl"
              color={`${settings.primaryColor}.500`}
            >
              拳皇97 出招表
            </Heading>

            {/* Name filter chips */}
            <Stack gap={3}>
              <Text
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                按角色筛选
              </Text>
              <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
              >
                {allNames.map((name) => (
                  <Button
                    key={name}
                    size="sm"
                    variant={character.name === name ? 'solid' : 'outline'}
                    colorPalette={settings.primaryColor}
                    onClick={() => navigate(`/kof97/${encodeURIComponent(name)}`)}
                  >
                    {name}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  colorPalette={settings.primaryColor}
                  onClick={() => navigate('/kof97/all')}
                >
                  全部
                </Button>
              </Box>
            </Stack>

            <Separator />

            {/* Character detail */}
            <Box
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg="gray.50"
              _dark={{ bg: 'gray.900' }}
            >
              <HStack
                justify="space-between"
                mb={3}
              >
                <HStack>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Heading
                      as="h2"
                      size="md"
                    >
                      {character.name}
                    </Heading>
                    <Box
                      mt={2}
                      mb={1}
                    >
                      {hasSprite(character.avatar) ? (
                        <Kof97Avatar
                          characterName={character.name}
                          fitToSize={false}
                          spriteScale={0.3}
                          border="1px solid"
                          borderColor="gray.300"
                          spriteOverride={character.avatar.sprite}
                        />
                      ) : (
                        <Image
                          src={getAssetUrl('/assets/kof97/placeholder.png')}
                          alt="占位图标"
                          width={75}
                          height={75}
                          style={{
                            width: '75px',
                            height: '75px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            background: '#eee',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </HStack>
                <Tag.Root
                  colorPalette="gray"
                  size="sm"
                >
                  <Tag.Label>共 {character.skills.length} 招</Tag.Label>
                </Tag.Root>
              </HStack>

              {/* Desktop table */}
              <Box
                display={{ base: 'none', md: 'block' }}
                overflowX="auto"
              >
                <Table.Root
                  size="md"
                  variant="outline"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader minW="80px">招式</Table.ColumnHeader>
                      <Table.ColumnHeader minW="60px">类型</Table.ColumnHeader>
                      <Table.ColumnHeader
                        w="260px"
                        minW="200px"
                      >
                        说明
                      </Table.ColumnHeader>
                      <Table.ColumnHeader minW="80px">指令</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="right">图片</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {visibleSkills.map((s, idx) => (
                      <Table.Row key={`${character.name}-${idx}-${s.name}`}>
                        <Table.Cell
                          minW="80px"
                          textAlign="left"
                        >
                          <Text fontSize="md">{s.name}</Text>
                        </Table.Cell>
                        <Table.Cell
                          minW="60px"
                          textAlign="left"
                        >
                          <Text fontSize="md">{s.type}</Text>
                        </Table.Cell>
                        <Table.Cell
                          textAlign="left"
                          maxW="260px"
                        >
                          <Text
                            color="gray.600"
                            _dark={{ color: 'gray.400' }}
                            whiteSpace="pre-wrap"
                            wordBreak="break-all"
                            textAlign="left"
                            fontSize="md"
                          >
                            {s.description}
                          </Text>
                        </Table.Cell>
                        <Table.Cell
                          minW="80px"
                          textAlign="left"
                        >
                          <Text
                            whiteSpace="pre-wrap"
                            textAlign="left"
                            fontSize="md"
                          >
                            {s.command}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          {Array.isArray(s.images) && s.images.length > 0 ? (
                            <Box
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ImageCarousel
                                images={s.images}
                                basePath={getAssetUrl(`/assets/kof97/${character.name}`)}
                                alt={`${character.name}-${s.name}`}
                                width="500px"
                                autoPlayInterval={3000}
                              />
                            </Box>
                          ) : null}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>

              {/* Mobile stacked layout */}
              <Stack
                gap={4}
                display={{ base: 'flex', md: 'none' }}
              >
                {visibleSkills.map((s, idx) => (
                  <Box
                    key={`${character.name}-m-${idx}-${s.name}`}
                    borderWidth="0"
                    borderTopWidth="1px"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'gray.700' }}
                    p={0}
                  >
                    <Stack
                      gap={0}
                      pt={3}
                      pb={3}
                      px={0}
                    >
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        mb={0}
                      >
                        {s.name}
                      </Text>
                      <HStack
                        mt={0}
                        mb={2}
                      >
                        <Tag.Root size="sm">
                          <Tag.Label>{s.type}</Tag.Label>
                        </Tag.Root>
                      </HStack>
                      {s.description ? (
                        <Text
                          fontSize="md"
                          color="gray.600"
                          _dark={{ color: 'gray.400' }}
                          whiteSpace="pre-wrap"
                          mb={2}
                        >
                          {s.description}
                        </Text>
                      ) : null}
                      <Text
                        fontSize="md"
                        color="gray.700"
                        _dark={{ color: 'gray.200' }}
                        whiteSpace="pre-wrap"
                        mb={0}
                      >
                        {s.command}
                      </Text>
                    </Stack>
                    {Array.isArray(s.images) && s.images.length > 0 ? (
                      <Box mt={0}>
                        <ImageCarousel
                          images={s.images}
                          basePath={getAssetUrl(`/assets/kof97/${character.name}`)}
                          alt={`${character.name}-${s.name}`}
                          width="100%"
                          autoPlayInterval={3000}
                        />
                      </Box>
                    ) : null}
                  </Box>
                ))}
              </Stack>

              {/* Sentinel for infinite loading skills */}
              <Box
                ref={skillsSentinelRef}
                h="1px"
                mt={4}
              />
              {visibleSkillsCount < character.skills.length ? (
                <Text
                  textAlign="center"
                  color="gray.500"
                  _dark={{ color: 'gray.500' }}
                  mt={2}
                >
                  加载中… 下拉以加载更多招式
                </Text>
              ) : character.skills.length > SKILLS_PAGE_SIZE ? (
                <Text
                  textAlign="center"
                  color="gray.400"
                  _dark={{ color: 'gray.600' }}
                  mt={2}
                >
                  已加载全部 {character.skills.length} 招
                </Text>
              ) : null}
            </Box>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default CharacterPage;
