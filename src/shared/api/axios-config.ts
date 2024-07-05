import axios from "axios"

import { useAuthStore } from "@/auth/store/auth.store"

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export const axiosInstanceWithToken = () => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${
    useAuthStore.getState().token
  }`
  return axiosInstance
}
