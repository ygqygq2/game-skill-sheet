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
  if (config.cdn.baseUrl && normalizedPath.startsWith('assets/kof97/')) {
    // Replace 'assets/' with CDN base URL
    // e.g., assets/kof97/草薙京/image.jpg -> https://cdn.example.com/kof97/草薙京/image.jpg
    const cdnPath = normalizedPath.replace('assets/', '');
    return `${config.cdn.baseUrl}/${cdnPath}`;
  }

  // For non-kof97 assets or when CDN is not configured, use local path
  return `/${normalizedPath}`;
}
