import React, { useMemo, useState } from 'react';
import { Box, Button, Container, Grid, Heading, HStack, Input, Stack, Text, Textarea, VStack } from '@chakra-ui/react';
import { Kof97Avatar } from '@/components/kof97/kof97-avatar';
import { SPRITE_IMAGE, type SpritePosition } from '@/config/kof97-sprite';
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

interface RowState {
  name: string;
  pos: SpritePosition; // 可调坐标
}

// 优化：使用 memo 避免不必要的重渲染
const CharacterCard = React.memo(
  ({
    row,
    idx,
    spriteScale,
    spriteWidth,
    spriteHeight,
    onUpdate,
  }: {
    row: RowState;
    idx: number;
    spriteScale: number;
    spriteWidth: number;
    spriteHeight: number;
    onUpdate: (idx: number, field: keyof SpritePosition, value: number) => void;
  }) => {
    const spriteText = `"sprite": { "x": ${row.pos.x}, "y": ${row.pos.y}, "width": ${row.pos.width}, "height": ${row.pos.height} }`;
    const scaledW = Math.max(1, Math.round(row.pos.width * spriteScale));
    const scaledH = Math.max(1, Math.round(row.pos.height * spriteScale));

    return (
      <Box
        p={3}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Text
          fontWeight="medium"
          mb={2}
        >
          {idx + 1}. {row.name}
        </Text>
        <VStack
          align="stretch"
          gap={2}
        >
          <HStack
            align="start"
            gap={3}
          >
            <Box
              flexShrink={0}
              width={`${scaledW}px`}
              height={`${scaledH}px`}
            >
              <Kof97Avatar
                characterName={row.name}
                border="1px solid"
                borderColor="gray.300"
                spriteOverride={row.pos}
                spriteSizeOverride={{ width: spriteWidth, height: spriteHeight }}
                fitToSize={false}
                spriteScale={spriteScale}
              />
            </Box>
            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={2}
              flex={1}
            >
              {(['x', 'y', 'width', 'height'] as Array<keyof SpritePosition>).map((field) => (
                <HStack
                  key={String(field)}
                  gap={1}
                >
                  <Text
                    minW="50px"
                    fontSize="xs"
                    fontWeight="medium"
                  >
                    {String(field)}
                  </Text>
                  <Input
                    size="sm"
                    type="number"
                    value={String(row.pos[field])}
                    onChange={(e) => onUpdate(idx, field, Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        onUpdate(idx, field, row.pos[field] + 1);
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        onUpdate(idx, field, Math.max(0, row.pos[field] - 1));
                      }
                    }}
                    flex={1}
                  />
                </HStack>
              ))}
            </Grid>
          </HStack>
          <Textarea
            size="sm"
            value={spriteText}
            readOnly
            rows={2}
            fontSize="xs"
            fontFamily="mono"
            onClick={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.select();
              navigator.clipboard.writeText(spriteText);
            }}
            cursor="pointer"
            title="点击全选并复制"
            w="100%"
          />
        </VStack>
      </Box>
    );
  }
);

CharacterCard.displayName = 'CharacterCard';

export function Kof97SpriteTune(): React.JSX.Element {
  // 从 JSON 文件读取初始坐标
  const initialRows = useMemo<RowState[]>(() => {
    return Object.entries(allCharJsonModules)
      .map(([path, json]) => {
        const name = getNameFromPath(path);
        const character = Array.isArray(json) ? json[0] : json;

        // 从 JSON 的 avatar.sprite 读取坐标
        let pos: SpritePosition = { x: 0, y: 0, width: 138, height: 129 };
        if (character?.avatar && typeof character.avatar === 'object' && character.avatar.sprite) {
          pos = { ...character.avatar.sprite };
        }

        return { name, pos } as RowState;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [rows, setRows] = useState<RowState[]>(initialRows);

  // 显示缩放：将整张雪碧图按比例缩放（默认 0.5）
  const [spriteScale, setSpriteScale] = useState(0.5);

  // 雪碧图原始尺寸
  const [spriteWidth, setSpriteWidth] = useState(3306);
  const [spriteHeight, setSpriteHeight] = useState(1638);

  // 更新某一行坐标
  const updatePos = (idx: number, field: keyof SpritePosition, value: number) => {
    setRows((prev) => {
      const next = [...prev];
      const row: RowState = { ...next[idx] } as RowState;
      row.pos = {
        ...row.pos,
        [field]: value,
      } as SpritePosition;
      next[idx] = row;
      return next;
    });
  };

  const resetAll = () => setRows(initialRows);

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <Stack gap={6}>
          <Box>
            <Heading
              size="lg"
              mb={2}
            >
              KOF97 雪碧图坐标调试
            </Heading>
            <Text color="gray.600">
              雪碧图：{SPRITE_IMAGE} · 角色数：{rows.length}
            </Text>
          </Box>

          <HStack
            gap={6}
            wrap="wrap"
          >
            <HStack gap={2}>
              <Text fontWeight="medium">显示缩放:</Text>
              <HStack gap={1}>
                <Input
                  type="number"
                  step={0.05}
                  value={spriteScale}
                  onChange={(e) => setSpriteScale(Number(e.target.value))}
                  width="80px"
                  size="sm"
                />
                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  (例如 0.5 = 半尺寸)
                </Text>
              </HStack>
            </HStack>
            <HStack gap={2}>
              <Text fontWeight="medium">雪碧图尺寸:</Text>
              <HStack gap={1}>
                <Input
                  type="number"
                  value={spriteWidth}
                  onChange={(e) => setSpriteWidth(Number(e.target.value))}
                  width="70px"
                  size="sm"
                />
                <Text>×</Text>
                <Input
                  type="number"
                  value={spriteHeight}
                  onChange={(e) => setSpriteHeight(Number(e.target.value))}
                  width="70px"
                  size="sm"
                />
              </HStack>
            </HStack>
          </HStack>

          <HStack>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetAll}
            >
              还原初始值
            </Button>
          </HStack>

          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            {rows.map((r, idx) => (
              <CharacterCard
                key={r.name}
                row={r}
                idx={idx}
                spriteScale={spriteScale}
                spriteWidth={spriteWidth}
                spriteHeight={spriteHeight}
                onUpdate={updatePos}
              />
            ))}
          </Grid>

          <Box
            p={4}
            bg="gray.50"
            borderRadius="md"
          >
            <Heading
              size="sm"
              mb={2}
            >
              使用说明
            </Heading>
            <VStack
              align="start"
              gap={1}
              fontSize="sm"
            >
              <Text>• 使用键盘 ↑↓ 方向键微调数值</Text>
              <Text>• 点击下方的文本框自动全选并复制 sprite 配置</Text>
              <Text>• 将复制的内容粘贴到对应角色的 JSON 文件的 avatar 字段中</Text>
            </VStack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
