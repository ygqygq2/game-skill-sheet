/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PORT?: string;
  readonly VITE_CDN_BASE_URL?: string;
  readonly VITE_SITE_VERSION?: string;
  readonly VITE_LOG_LEVEL?: string;
  readonly VITE_AUTH_STRATEGY?: string;
  readonly VITE_AUTH0_DOMAIN?: string;
  readonly VITE_AUTH0_CLIENT_ID?: string;
  readonly VITE_COGNITO_IDENTITY_POOL_ID?: string;
  readonly VITE_COGNITO_USER_POOL_CLIENT_ID?: string;
  readonly VITE_COGNITO_USER_POOL_ID?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_MAPBOX_API_KEY?: string;
  readonly VITE_GOOGLE_TAG_MANAGER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
