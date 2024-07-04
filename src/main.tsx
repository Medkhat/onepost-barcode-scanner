import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"

import { router } from "@/router"
import { queryClient } from "@/shared/api/query"
import { ThemeProvider } from "@/shared/components/theme/provider.tsx"
import { Toaster } from "@/shared/components/ui/sonner"

import "@/shared/i18n/config"

import "@/shared/styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
