import { Box, Button, Container, HStack, Heading, Image, Separator, Stack, Table, Tag, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { useSettings } from '@/hooks/use-settings';

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
}

// Load all character json files under src/data/kof97
function useKof97Data() {
  // Using Vite's glob import to eagerly load JSON files
  const modules = React.useMemo(
    () => import.meta.glob<{ default: Array<Character> }>('@/data/kof97/*.json', { eager: true }),
    []
  );

  const characters = React.useMemo<Character[]>(() => {
    const list: Character[] = [];
    for (const key of Object.keys(modules)) {
      const mod = (modules as any)[key];
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

const PAGE_SIZE = 6;

export function Page(): React.JSX.Element {
  const { characters } = useKof97Data();
  const [selectedName, setSelectedName] = React.useState<string | null>(null);
  const [visibleCount, setVisibleCount] = React.useState<number>(PAGE_SIZE);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  const filtered = React.useMemo(() => {
    if (!selectedName) return characters;
    return characters.filter((c) => c.name === selectedName);
  }, [characters, selectedName]);

  React.useEffect(() => {
    // Reset pagination when filter changes
    setVisibleCount(PAGE_SIZE);
  }, [selectedName]);

  React.useEffect(() => {
    // IntersectionObserver for lazy loading
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= filtered.length) return prev;
            return Math.min(prev + PAGE_SIZE, filtered.length);
          });
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  const names = React.useMemo(() => characters.map((c) => c.name), [characters]);
  const showList = filtered.slice(0, visibleCount);

  const { settings } = useSettings();

  return (
    <React.Fragment>
      <Helmet>
        <title>拳皇97 出招表</title>
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
                <Button
                  size="sm"
                  variant={selectedName === null ? 'solid' : 'outline'}
                  colorPalette={settings.primaryColor}
                  onClick={() => setSelectedName(null)}
                >
                  全部
                </Button>
                {names.map((name) => (
                  <Button
                    key={name}
                    size="sm"
                    variant={selectedName === name ? 'solid' : 'outline'}
                    colorPalette={settings.primaryColor}
                    onClick={() => setSelectedName(name)}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
            </Stack>

            <Separator />

            {/* Character sections */}
            <Stack gap={8}>
              {showList.map((char) => (
                <Box
                  key={char.name}
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
                          {char.name}
                        </Heading>
                        <Box
                          mt={2}
                          mb={1}
                        >
                          <Image
                            src="/assets/kof97/placeholder.png"
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
                        </Box>
                      </Box>
                    </HStack>
                    <Tag.Root
                      colorPalette="gray"
                      size="sm"
                    >
                      <Tag.Label>共 {char.skills.length} 招</Tag.Label>
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
                        {char.skills.map((s, idx) => (
                          <Table.Row key={`${char.name}-${idx}-${s.name}`}>
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
                                  w={{ base: '100%', md: '620px' }}
                                  display="flex"
                                  justifyContent="flex-end"
                                  gap={2}
                                >
                                  {s.images.map((img, i) => (
                                    <Image
                                      key={img + i}
                                      src={`/assets/kof97/${char.name}/${img}`}
                                      alt={`${char.name}-${s.name}-${i}`}
                                      width="300px"
                                      height="auto"
                                      objectFit="contain"
                                      loading="lazy"
                                      borderRadius="md"
                                      maxW="300px"
                                    />
                                  ))}
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
                    {char.skills.map((s, idx) => (
                      <Box
                        key={`${char.name}-m-${idx}-${s.name}`}
                        borderWidth="1px"
                        borderRadius="md"
                        p={3}
                      >
                        <Stack gap={2}>
                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                          >
                            {s.name}
                          </Text>
                          <HStack>
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
                            >
                              {s.description}
                            </Text>
                          ) : null}
                          <Text
                            fontSize="md"
                            color="gray.700"
                            _dark={{ color: 'gray.200' }}
                            whiteSpace="pre-wrap"
                          >
                            {s.command}
                          </Text>
                          {Array.isArray(s.images) && s.images.length > 0 ? (
                            <Image
                              src={`/assets/kof97/${char.name}/${s.images[0]}`}
                              alt={`${char.name}-${s.name}-0`}
                              w="100%"
                              h="auto"
                              objectFit="contain"
                              loading="lazy"
                              borderRadius="md"
                            />
                          ) : null}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}

              {/* Sentinel for infinite loading */}
              <Box
                ref={sentinelRef}
                h="1px"
              />
              {showList.length < filtered.length ? (
                <Text
                  textAlign="center"
                  color="gray.500"
                  _dark={{ color: 'gray.500' }}
                >
                  加载中… 下拉以加载更多
                </Text>
              ) : (
                <Text
                  textAlign="center"
                  color="gray.400"
                  _dark={{ color: 'gray.600' }}
                >
                  已全部加载
                </Text>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default Page;
