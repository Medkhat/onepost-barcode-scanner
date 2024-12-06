import { createBrowserRouter } from "react-router-dom"

import AuthRoute from "@/modules/auth/auth.route"
import GeneralError from "@/shared/components/layout/general-error"
import { RouteNames } from "@/shared/lib/constants"

export const router = createBrowserRouter([
  {
    path: RouteNames.ROOT,
    lazy: async () => {
      const AppShell = await import("@/shared/components/layout/app-shell")
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("@/modules/barcodes/barcodes.route"))
            .default,
        }),
      },
    ],
  },
  {
    path: RouteNames.LOGIN,
    element: <AuthRoute />,
  },
])
