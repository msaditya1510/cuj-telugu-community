/// <reference types="vite/client" />

/**
 * Environment Variables Type Definitions
 * 
 * To use environment variables in your code, import from @/config/api
 * Example: import { API_BASE_URL } from '@/config/api';
 */

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}