import { LoginType, SignInResponse } from "@/modules/auth/api/auth.types"
import { SignInPayload } from "@/modules/auth/hooks/use-auth-form-schemas"
import {
  axiosInstanceWithoutToken,
  BaseApiPaths,
} from "@/shared/api/axios-config"

export const signIn = async (payload: SignInPayload, loginType: LoginType) => {
  return (
    await axiosInstanceWithoutToken(BaseApiPaths.AUTH).post<SignInResponse>(
      `/verify-${loginType}-password/`,
      payload
    )
  ).data
}
