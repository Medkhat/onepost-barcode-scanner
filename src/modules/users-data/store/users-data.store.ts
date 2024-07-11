import { create } from "zustand"

import { UsersData } from "@/modules/users-data/api/users-data.types"

type UsersDataStore = {
  usersData: UsersData | null
}

export const useUsersDataStore = create<UsersDataStore>(() => ({
  usersData: null,
}))
