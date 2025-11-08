import { AuthStrategy } from '@/lib/auth/strategy';

import { getSiteURL } from './lib/get-site-url';
import { LogLevel } from './lib/logger';
import type { ColorMode, PrimaryColor } from './styles/theme/types';

export interface Config {
  site: {
    name: string;
    description: string;
    colorScheme: ColorMode;
    primaryColor: PrimaryColor;
    themeColor: string;
    url: string;
    version: string;
  };
  logLevel: keyof typeof LogLevel;
  auth: { strategy: keyof typeof AuthStrategy };
  auth0: { domain?: string; clientId?: string };
  cognito: { identityPoolId?: string; userPoolClientId?: string; userPoolId?: string };
  firebase: {
    apiKey?: string;
    appId?: string;
    authDomain?: string;
    messagingSenderId?: string;
    projectId?: string;
    storageBucket?: string;
  };
  supabase: { url?: string; anonKey?: string };
  mapbox: { apiKey?: string };
  gtm?: { id?: string };
  cdn: {
    baseUrl?: string;
    /** CDN 资源路径规则：只有匹配这些模式的资源才走 CDN */
    includePaths?: string[];
    /** CDN 排除路径规则：即使匹配 includePaths 也要排除的路径 */
    excludePaths?: string[];
  };
}

export const config = {
  site: {
    name: '游戏出招表',
    description: '专业的格斗游戏出招表查询平台，收录经典格斗游戏技能资料',
    colorScheme: 'light',
    themeColor: '#090a0b',
    primaryColor: 'neonBlue',
    url: getSiteURL(),
    version: import.meta.env.VITE_SITE_VERSION || '0.0.0',
  },
  logLevel: (import.meta.env.VITE_LOG_LEVEL as keyof typeof LogLevel) || LogLevel.ALL,
  auth: { strategy: (import.meta.env.VITE_AUTH_STRATEGY as keyof typeof AuthStrategy) || AuthStrategy.CUSTOM },
  auth0: { domain: import.meta.env.VITE_AUTH0_DOMAIN, clientId: import.meta.env.VITE_AUTH0_CLIENT_ID },
  cognito: {
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  },
  supabase: { url: import.meta.env.VITE_SUPABASE_URL, anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY },
  mapbox: { apiKey: import.meta.env.VITE_MAPBOX_API_KEY },
  gtm: { id: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID },
  cdn: {
    baseUrl: import.meta.env.VITE_CDN_BASE_URL,
    // kof97 角色技能图等大文件走 CDN
    includePaths: ['assets/kof97/**'],
    // 不需要排除了，小文件已经移到 assets/images/ 目录
    excludePaths: [],
  },
} satisfies Config;
