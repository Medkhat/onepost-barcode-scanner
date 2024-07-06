import { BaseDataFields } from "@/shared/api/types"

export type GetOTPPayload = {
  phone: string
  country_code: string
  code_type: "login"
}

export type VerifyOTPPayload = GetOTPPayload & {
  verification_code: string
}

export type UserFields = BaseDataFields & {
  first_name: string
  last_name: string
  email: string
  phone: string
  user: null
}

export type VerifyOTPResponse = {
  data: UserFields
  access_token: string
  refresh_token: string
}
