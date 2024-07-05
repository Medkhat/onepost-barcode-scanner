import { create } from "zustand"

import { CurrentUserData } from "@/modules/auth/api/auth.types"
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
  userData: JSON.parse(localStorage.getItem(StorageKeys.USER_DATA) || "null"),
  logout: () => {
    localStorage.clear()
    set({ isLoggedIn: false, token: "", userData: null })
  },
  setStoreData: (data) => {
    set(data)
    localStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(data.userData))
    localStorage.setItem(StorageKeys.TOKEN, data.token as string)
  },
}))
