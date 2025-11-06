import { describe, expect, it, vi } from 'vitest';

import { getAssetUrl } from '../get-asset-url';

// Mock config
vi.mock('@/config', () => ({
  config: {
    cdn: {
      baseUrl: 'https://images.linuxba.com/projects/game-skill-sheet',
    },
  },
}));

describe('getAssetUrl', () => {
  it('should convert kof97 asset path to CDN URL', () => {
    const path = '/assets/kof97/草薙京/image.jpg';
    const result = getAssetUrl(path);
    expect(result).toBe('https://images.linuxba.com/projects/game-skill-sheet/kof97/草薙京/image.jpg');
  });

  it('should handle path without leading slash', () => {
    const path = 'assets/kof97/八神庵/skill.jpg';
    const result = getAssetUrl(path);
    expect(result).toBe('https://images.linuxba.com/projects/game-skill-sheet/kof97/八神庵/skill.jpg');
  });

  it('should return local path for non-kof97 assets', () => {
    const path = '/assets/other/image.png';
    const result = getAssetUrl(path);
    expect(result).toBe('/assets/other/image.png');
  });
});
