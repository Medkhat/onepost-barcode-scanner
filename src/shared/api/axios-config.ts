import axios from "axios"

import { useAuthStore } from "@/modules/auth/store/auth.store"

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Userid: "",
  },
})

export const BaseApiPaths = {
  AUTH: import.meta.env.UDA_AUTH_API_URL,
  USER: import.meta.env.UDA_USER_API_URL,
  APP: import.meta.env.UDA_APP_API_URL,
  EXPRESS: import.meta.env.UDA_EXPRESS_API_URL,
}

export const axiosInstanceWithoutToken = (basePath: string) => {
  axiosInstance.defaults.baseURL = basePath
  return axiosInstance
}

export const axiosInstanceWithToken = (basePath: string) => {
  axiosInstance.defaults.baseURL = basePath
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${
    useAuthStore.getState().token
  }`
  axios.defaults.headers.common["Userid"] = useAuthStore.getState().userData?.id
  return axiosInstance
}
