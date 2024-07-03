import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { router } from "@/router"
import { ThemeProvider } from "@/shared/components/theme/provider.tsx"

import "@/shared/i18n/config"

import "@/shared/styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
