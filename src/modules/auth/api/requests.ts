import axios from "axios"

import {
  GetOTPPayload,
  VerifyOTPPayload,
  VerifyOTPResponse,
} from "@/auth/api/types"
import { GeneralSuccessResponse } from "@/shared/api/types"

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.UDA_AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getOtp = async (payload: GetOTPPayload) => {
  return (
    await authAxiosInstance.post<GeneralSuccessResponse>("/get-sms/", payload)
  ).data
}

export const verifyOtp = async (payload: VerifyOTPPayload) => {
  return (
    await authAxiosInstance.post<VerifyOTPResponse>("/verify-sms/", payload)
  ).data
}
