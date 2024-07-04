/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly UDA_AUTH_API_URL: string
  readonly UDA_USER_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
