/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key — set in `.env` / `.env.local` (never commit real values). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
