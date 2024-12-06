import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    envPrefix: "OPSP",
    server: {
      port: 3000,
      // proxy: {
      //   "/auth": {
      //     target: env.OP_AUTH_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/auth/, ""),
      //   },
      // },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
