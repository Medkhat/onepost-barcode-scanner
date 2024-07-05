import { Navigate } from "react-router-dom"

import { useAuthStore } from "@/modules/auth/store/auth.store"
import { RouteNames } from "@/shared/lib/constants"

export const useAuthChecker = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  if (isLoggedIn) {
    return
  }

  return <Navigate to={RouteNames.LOGIN} />
}
