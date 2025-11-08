import { use } from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { logger } from './default-logger';

// Compute base URL from Vite for static hosting (e.g., GitHub Pages project path)
const base: string = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/';
const baseTrimmed = typeof base === 'string' ? base.replace(/\/$/, '') : '';

export const i18n = use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: `${baseTrimmed}/locales/{{lng}}/{{ns}}.json`,
    },
  })
  .catch((err) => {
    logger.error('Failed to initialize i18n', err);
  });
