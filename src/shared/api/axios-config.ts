import axios from "axios"

import { useAuthStore } from "@/modules/auth/auth.store"

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Userid: "",
  },
})

export const BaseApiPaths = {
  AUTH: import.meta.env.OPSP_API_URL + "/auth/api/v1",
  EXPRESS_STAFF: import.meta.env.OPSP_API_URL + "/express/staff/api/v1",
  EXPRESS_WAREHOUSE_STAFF:
    import.meta.env.OPSP_API_URL + "/express/warehouse-staff/api/v1",
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
