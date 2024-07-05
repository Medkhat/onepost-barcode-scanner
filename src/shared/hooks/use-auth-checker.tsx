import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/modules/auth/store/auth.store"
import { RouteNames } from "@/shared/lib/constants"

export const useAuthChecker = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(RouteNames.LOGIN, { replace: true })
    }
  }, [isLoggedIn, navigate])
}
