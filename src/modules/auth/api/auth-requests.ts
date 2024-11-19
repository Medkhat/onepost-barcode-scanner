import { SignInPayload } from "@/modules/auth/api/auth.types"
import {
  axiosInstanceWithoutToken,
  BaseApiPaths,
} from "@/shared/api/axios-config"
import { GeneralSuccessResponse } from "@/shared/api/types"

export const signIn = async (payload: SignInPayload) => {
  return (
    await axiosInstanceWithoutToken(
      BaseApiPaths.AUTH
    ).post<GeneralSuccessResponse>("/verify-password/", payload)
  ).data
}
