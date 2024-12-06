/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPSP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
