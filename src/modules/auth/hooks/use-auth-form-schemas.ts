import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { z } from "zod"

export const usePhoneNumberFormSchema = () => {
  const { t: authT } = useTranslation("auth")
  return useMemo(
    () =>
      z.object({
        phone: z
          .string()
          .min(12, {
            message: authT("phoneValidation"),
          })
          .max(12, {
            message: authT("phoneValidation"),
          }),
      }),
    [authT]
  )
}
export type PhoneNumberFormFields = z.infer<
  ReturnType<typeof usePhoneNumberFormSchema>
>

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
