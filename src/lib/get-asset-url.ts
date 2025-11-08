import { config } from '@/config';

/**
 * Get the full URL for an asset, using CDN if configured
 * @param path - The asset path, should start with /assets/
 * @returns The full URL (CDN or local)
 */
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // Check if CDN is configured and the path is for kof97 assets
  // 排除头像和封面图等小文件,只对角色技能图片使用 CDN
  const shouldUseCdn =
    config.cdn.baseUrl &&
    normalizedPath.startsWith('assets/kof97/') &&
    !normalizedPath.includes('/avatars/') && // 排除头像
    !normalizedPath.includes('kof97-title'); // 排除封面图

  if (shouldUseCdn) {
    // Replace 'assets/' with CDN base URL
    // e.g., assets/kof97/草薙京/image.jpg -> https://cdn.example.com/kof97/草薙京/image.jpg
    const cdnPath = normalizedPath.replace('assets/', '');
    return `${config.cdn.baseUrl}/${cdnPath}`;
  }

  // For non-kof97 assets or when CDN is not configured, prefix with Vite base path
  const base: string = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';
  const baseTrimmed = typeof base === 'string' ? base.replace(/\/$/, '') : '';
  return `${baseTrimmed}/${normalizedPath}`;
}
