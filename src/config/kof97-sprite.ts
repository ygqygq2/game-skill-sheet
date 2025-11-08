/**
 * KOF97 角色头像雪碧图配置
 */

export interface SpritePosition {
  x: number; // 水平位置(像素)
  y: number; // 垂直位置(像素)
  width: number; // 头像宽度
  height: number; // 头像高度
}

// 雪碧图路径
export const SPRITE_IMAGE = '/assets/kof97/avatar-spire.png';

// 雪碧图总尺寸
export const SPRITE_WIDTH = 3306;
export const SPRITE_HEIGHT = 1638;

// 默认头像尺寸（包含边框）
export const DEFAULT_AVATAR_WIDTH = 102;
export const DEFAULT_AVATAR_HEIGHT = 102;
