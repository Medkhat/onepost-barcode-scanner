import { createBrowserRouter } from "react-router-dom"

import AuthRoute from "@/modules/auth/auth.route"
import GeneralError from "@/shared/components/layout/general-error"
import { RouteNames } from "@/shared/lib/constants"

export const router = createBrowserRouter([
  {
    path: RouteNames.ROOT,
    lazy: async () => {
      const AppShell = await import("@/shared/components/layout/app-shelll")
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("@/modules/dashboard/dashboard.route"))
            .default,
        }),
      },
      {
        path: RouteNames.ORGANIZATIONS,
        lazy: async () => ({
          Component: (
            await import("@/modules/organizations/organizations.route")
          ).default,
        }),
      },
      {
        path: RouteNames.ORDERS_STATUSES,
        lazy: async () => ({
          Component: (
            await import("@/modules/orders-statuses/orders-statuses.route")
          ).default,
        }),
      },
    ],
  },
  {
    path: RouteNames.LOGIN,
    element: <AuthRoute />,
  },
])
