import { createBrowserRouter } from "react-router-dom"

import RootRoute from "@/app.route"
import AuthRoute from "@/auth/auth.route"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
  },
  {
    path: "/auth",
    element: <AuthRoute />,
  },
])
