import react from "@vitejs/plugin-react-swc"
import fs from "fs"
import path from "path"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    envPrefix: "UDA",
    server: {
      port: 3000,
      https:
        env.NODE_ENV === "development"
          ? {
              key: fs.readFileSync(
                path.resolve(__dirname, "certs/localhost-key.pem")
              ),
              cert: fs.readFileSync(
                path.resolve(__dirname, "certs/localhost.pem")
              ),
            }
          : undefined,
      // proxy: {
      //   "/auth": {
      //     target: env.UDA_AUTH_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/auth/, ""),
      //   },
      //   "/user": {
      //     target: env.UDA_USER_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/user/, ""),
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
