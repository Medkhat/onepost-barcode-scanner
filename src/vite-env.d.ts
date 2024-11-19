/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
