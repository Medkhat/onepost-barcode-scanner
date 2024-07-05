import { create } from "zustand"

import { CurrentUserData } from "@/auth/api/auth.types"
import { StorageKeys } from "@/shared/lib/constants"

type AuthStore = {
  isLoggedIn: boolean
  token: string
  userData: CurrentUserData | null
  logout: () => void
  setStoreData: (data: Partial<AuthStore>) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!localStorage.getItem(StorageKeys.TOKEN),
  token: localStorage.getItem(StorageKeys.TOKEN) || "",
  userData: null,
  logout: () => {
    localStorage.removeItem(StorageKeys.TOKEN)
    set({ isLoggedIn: false, token: "" })
  },
  setStoreData: (data) => {
    set(data)
    localStorage.setItem(StorageKeys.TOKEN, data.token as string)
  },
}))
