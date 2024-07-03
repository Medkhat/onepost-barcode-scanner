import { createBrowserRouter } from "react-router-dom"

import RootRoute from "@/app.route"
import AuthRoute from "@/auth/auth.route"
import { RouteNames } from "@/shared/lib/constants"

export const router = createBrowserRouter([
  {
    path: RouteNames.ROOT,
    element: <RootRoute />,
  },
  {
    path: RouteNames.LOGIN,
    element: <AuthRoute />,
  },
])
