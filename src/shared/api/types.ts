export enum GeneralErrorCodes {
  "400x1" = "GET_OTP_FAILED",
  "400x2" = "INVALID_PHONE",
  "400x3" = "INVALID_COUNTRY_CODE",
  "400x4" = "INVALID_VERIFICATION_CODE",
  "400x5" = "VALIDATION_ERROR_CODE",
  "401x1" = "INVALID_TOKEN",
  "401x2" = "TOKEN_REQUIRED",
  "401x3" = "USER_ID_REQUIRED",
  "401x4" = "USER_NOT_ACTIVE",
  "401x5" = "USER_NOT_FOUND",
}

export type GeneralSuccessResponse = {
  code: number
  message: string
  message_code: string
}

export type GeneralErrorResponse = {
  code: number
  message: GeneralErrorCodes
  message_code: GeneralErrorCodes
}

export type BaseDataFields = {
  id?: string
  created_at?: string
  updated_at?: string
}

export type BaseResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface BaseQueryParams {
  page?: number
  pSize?: number
  search?: string
  autocomplete?: string
  station_region?: string
  station_type?: number
}
