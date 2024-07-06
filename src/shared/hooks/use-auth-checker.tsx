import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAuthStore } from "@/modules/auth/store/auth.store"
import { RouteNames } from "@/shared/lib/constants"

export const useAuthChecker = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn && pathname !== RouteNames.LOGIN) {
      navigate(RouteNames.LOGIN, { replace: true })
    } else if (isLoggedIn && pathname === RouteNames.LOGIN) {
      navigate(RouteNames.ROOT, { replace: true })
    }
  }, [isLoggedIn, pathname, navigate])
}
