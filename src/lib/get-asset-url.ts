import { config } from '@/config';

/**
 * 获取运行时的 base 路径
 * 优先使用构建时注入的 BASE_URL（最可靠）
 * 运行时从 script 标签推断 base（用于验证或 SSR 场景）
 */
function getRuntimeBase(): string {
  // 优先使用构建时的 BASE_URL（Vite 注入）
  const buildTimeBase: string = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';

  // 浏览器环境：验证或从 script 标签推断
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // 从页面上的 script 标签推断实际 base
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('/assets/index-') && src.endsWith('.js')) {
        // 例如 src="/game-skill-sheet/assets/index-xxx.js"
        // 提取 "/game-skill-sheet/"
        const match = src.match(/^(\/[^/]+)\/assets\//);
        if (match && match[1]) {
          return match[1] + '/';
        }
        // 如果是根路径部署，src="/assets/index-xxx.js"
        if (src.startsWith('/assets/')) {
          return '/';
        }
      }
    }
  }

  // Fallback: 构建时的 BASE_URL
  return buildTimeBase;
}

/**
 * 检查路径是否匹配通配符模式
 * @param path - 要检查的路径
 * @param pattern - 通配符模式，支持 * (匹配任意字符) 和 ** (匹配任意层级)
 */
function matchPattern(path: string, pattern: string): boolean {
  // 将通配符模式转换为正则表达式
  // * 匹配除 / 外的任意字符，** 匹配包含 / 的任意字符
  const regexPattern = pattern
    .replace(/\*\*/g, '___DOUBLE_STAR___')
    .replace(/\*/g, '[^/]*')
    .replace(/___DOUBLE_STAR___/g, '.*');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Get the full URL for an asset, using CDN if configured
 * @param path - The asset path, should start with /assets/
 * @returns The full URL (CDN or local)
 */
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  // 检查是否应该使用 CDN
  let shouldUseCdn = false;

  if (config.cdn.baseUrl) {
    // 1. 检查是否匹配 includePaths（必须匹配至少一个）
    const includePaths = config.cdn.includePaths || [];
    const matchesInclude =
      includePaths.length === 0 || includePaths.some((pattern) => matchPattern(normalizedPath, pattern));

    // 2. 检查是否匹配 excludePaths（不能匹配任何一个）
    const excludePaths = config.cdn.excludePaths || [];
    const matchesExclude = excludePaths.some((pattern) => normalizedPath.includes(pattern));

    shouldUseCdn = matchesInclude && !matchesExclude;
  }

  if (shouldUseCdn) {
    // Replace 'assets/' with CDN base URL
    // e.g., assets/kof97/草薙京/image.jpg -> https://cdn.example.com/kof97/草薙京/image.jpg
    const cdnPath = normalizedPath.replace('assets/', '');
    return `${config.cdn.baseUrl}/${cdnPath}`;
  }

  // For non-CDN assets, prefix with runtime base path
  const base = getRuntimeBase();
  const baseTrimmed = base.replace(/\/$/, '');
  return `${baseTrimmed}/${normalizedPath}`;
}
