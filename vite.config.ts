import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    envPrefix: "OP",
    server: {
      port: 3000,
      proxy: {
        "/auth": {
          target: env.OP_AUTH_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ""),
        },
        "/user": {
          target: env.OP_USER_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/user/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
