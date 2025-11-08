import React from 'react';
import { Box, Image, type BoxProps } from '@chakra-ui/react';
import { SPRITE_IMAGE, SPRITE_WIDTH, SPRITE_HEIGHT, type SpritePosition } from '@/config/kof97-sprite';

export interface Kof97AvatarProps extends Omit<BoxProps, 'children'> {
  /** 角色名称 */
  characterName: string;
  /** 显示大小 (默认 64px) */
  size?: number;
  /** 若提供，将直接使用单独图片路径而不是雪碧图 */
  imageUrl?: string;
  /** 若提供，使用该坐标覆盖默认雪碧图坐标（用于调参页面临时预览） */
  spriteOverride?: SpritePosition;
  /** 雪碧图尺寸覆盖 (用于调试时动态调整) */
  spriteSizeOverride?: { width: number; height: number };
  /** 雪碧图显示缩放比例（例如 0.5 表示缩小一半） */
  spriteScale?: number;
  /** 是否让头像框按 size 适配（默认 true）。为 false 时使用 spriteScale 渲染原始像素级裁剪 */
  fitToSize?: boolean;
}

/**
 * KOF97 角色头像组件 (使用雪碧图)
 *
 * @example
 * ```tsx
 * <Kof97Avatar characterName="草薙京" size={64} />
 * ```
 */
export function Kof97Avatar({
  characterName,
  size = 64,
  imageUrl,
  spriteOverride,
  spriteSizeOverride,
  spriteScale,
  fitToSize = true,
  ...boxProps
}: Kof97AvatarProps): React.JSX.Element {
  // 如果有独立图片，直接渲染
  if (imageUrl) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        overflow="hidden"
        borderRadius="md"
        position="relative"
        {...boxProps}
      >
        <Image
          src={imageUrl}
          alt={characterName}
          width={size}
          height={size}
          style={{ display: 'block', objectFit: 'cover' }}
        />
      </Box>
    );
  }

  const spritePos = spriteOverride;
  const actualSpriteWidth = spriteSizeOverride?.width || SPRITE_WIDTH;
  const actualSpriteHeight = spriteSizeOverride?.height || SPRITE_HEIGHT;

  if (!spritePos) {
    console.warn(`未找到角色 "${characterName}" 的雪碧图位置，请提供 spriteOverride`);
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        bg="gray.200"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="xs"
        color="gray.500"
        {...boxProps}
      >
        ?
      </Box>
    );
  }

  if (fitToSize) {
    // 旧模式：根据 size 按宽度适配
    const scale = size / spritePos.width;
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        overflow="hidden"
        borderRadius="md"
        position="relative"
        {...boxProps}
      >
        <Box
          as="div"
          width={`${actualSpriteWidth}px`}
          height={`${actualSpriteHeight}px`}
          backgroundImage={`url(${SPRITE_IMAGE})`}
          backgroundRepeat="no-repeat"
          backgroundPosition={`-${spritePos.x}px -${spritePos.y}px`}
          transform={`scale(${scale})`}
          transformOrigin="top left"
          style={{ imageRendering: 'auto' }}
        />
      </Box>
    );
  }

  // 新模式：头像框不按 size 缩放，只按 spriteScale 对整张雪碧图缩放
  const scale = spriteScale ?? 1;
  const boxW = Math.max(1, Math.round(spritePos.width * scale));
  const boxH = Math.max(1, Math.round(spritePos.height * scale));

  return (
    <Box
      width={`${boxW}px`}
      height={`${boxH}px`}
      overflow="hidden"
      borderRadius="md"
      position="relative"
      {...boxProps}
    >
      <Box
        as="div"
        width={`${actualSpriteWidth}px`}
        height={`${actualSpriteHeight}px`}
        backgroundImage={`url(${SPRITE_IMAGE})`}
        backgroundRepeat="no-repeat"
        backgroundPosition={`-${spritePos.x}px -${spritePos.y}px`}
        transform={`scale(${scale})`}
        transformOrigin="top left"
        style={{ imageRendering: 'auto' }}
      />
    </Box>
  );
}

/**
 * 使用 CSS background-position 百分比的版本 (更简洁)
 */
export function Kof97AvatarSimple({
  characterName,
  size = 64,
  imageUrl,
  spriteOverride,
  ...boxProps
}: Kof97AvatarProps): React.JSX.Element {
  if (imageUrl) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        borderRadius="md"
        overflow="hidden"
        {...boxProps}
      >
        <Image
          src={imageUrl}
          alt={characterName}
          width={size}
          height={size}
          style={{ display: 'block', objectFit: 'cover' }}
        />
      </Box>
    );
  }
  const spritePos = spriteOverride;

  if (!spritePos) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        bg="gray.200"
        borderRadius="md"
        {...boxProps}
      >
        ?
      </Box>
    );
  }

  // 计算背景位置百分比
  const bgPosX = (spritePos.x / (SPRITE_WIDTH - spritePos.width)) * 100;
  const bgPosY = (spritePos.y / (SPRITE_HEIGHT - spritePos.height)) * 100;

  // 计算背景尺寸
  const bgWidth = (SPRITE_WIDTH / spritePos.width) * 100;
  const bgHeight = (SPRITE_HEIGHT / spritePos.height) * 100;

  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      borderRadius="md"
      backgroundImage={`url(${SPRITE_IMAGE})`}
      backgroundPosition={`${bgPosX}% ${bgPosY}%`}
      backgroundSize={`${bgWidth}% ${bgHeight}%`}
      backgroundRepeat="no-repeat"
      {...boxProps}
    />
  );
}
