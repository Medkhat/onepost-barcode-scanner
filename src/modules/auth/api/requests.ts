import {
  GetOTPPayload,
  VerifyOTPPayload,
  VerifyOTPResponse,
} from "@/modules/auth/api/auth.types"
import {
  axiosInstanceWithoutToken,
  BaseApiPaths,
} from "@/shared/api/axios-config"
import { GeneralSuccessResponse } from "@/shared/api/types"

export const getOtp = async (payload: GetOTPPayload) => {
  return (
    await axiosInstanceWithoutToken(
      BaseApiPaths.AUTH
    ).post<GeneralSuccessResponse>("/get-sms/", payload)
  ).data
}

export const verifyOtp = async (payload: VerifyOTPPayload) => {
  return (
    await axiosInstanceWithoutToken(BaseApiPaths.AUTH).post<VerifyOTPResponse>(
      "/verify-sms/",
      payload
    )
  ).data
}
