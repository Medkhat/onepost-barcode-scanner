import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

import { LoginType } from "@/modules/auth/api/auth.types"

export const useSignInFormSchema = (loginType: LoginType) => {
  const { t: authT } = useTranslation("auth")
  return useMemo(
    () =>
      loginType === "email"
        ? z.object({
            email: z.string().email({
              message: authT("emailValidation"),
            }),
            password: z.string().min(1, {
              message: authT("passwordIsRequired"),
            }),
          })
        : z.object({
            phone: z
              .string()
              .min(12, {
                message: authT("phoneValidation"),
              })
              .max(12, {
                message: authT("phoneValidation"),
              }),
            password: z.string().min(1, {
              message: authT("passwordIsRequired"),
            }),
          }),
    [authT, loginType]
  )
}
export type SignInPayload = z.infer<ReturnType<typeof useSignInFormSchema>>

export const useOtpFormSchema = () => {
  const { t: authT } = useTranslation("auth")
  return useMemo(
    () =>
      z.object({
        verification_code: z.string().min(4, {
          message: authT("otpValidation"),
        }),
      }),
    [authT]
  )
}
export type OtpForm = z.infer<ReturnType<typeof useOtpFormSchema>>
