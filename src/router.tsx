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
        path: RouteNames.ORGANIZATION_DETAIL,
        lazy: async () => ({
          Component: (
            await import("@/modules/organizations/organization.route")
          ).default,
        }),
      },
      {
        path: RouteNames.ORG_OWNERS,
        lazy: async () => ({
          Component: (await import("@/modules/org-owners/org-owners.route"))
            .default,
        }),
      },
      {
        path: RouteNames.STAFF,
        lazy: async () => ({
          Component: (await import("@/modules/staff/staff.route")).default,
        }),
      },
      {
        path: RouteNames.USERS_DATA,
        lazy: async () => ({
          Component: (await import("@/modules/users-data/users-data.route"))
            .default,
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
