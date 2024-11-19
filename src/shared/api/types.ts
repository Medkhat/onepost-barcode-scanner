import {
  MarketCompany,
  OrdersStatuses,
} from "@/modules/orders-statuses/api/orders-statuses.types"

export type GeneralSuccessResponse = GeneralErrorResponse

export type GeneralErrorResponse = {
  status_code: number
  message: string
  message_code: string[]
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
  status_type?: OrdersStatuses
  market_company?: MarketCompany
  station?: string
  is_payed?: string
}
