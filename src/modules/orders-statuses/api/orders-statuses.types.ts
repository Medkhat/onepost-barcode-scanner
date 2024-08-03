import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrdersStatuses =
  | "UNKNOWN"
  | "WAITING"
  | "IN_WAREHOUSE"
  | "ON_THE_WAY"
  | "AT_THE_BORDER"
  | "SORTED"
  | "DELIVERED"
  | "IN_DEPARTMENT"
  | "TAKEN"

export type MarketCompany = "PINDODO" | "TEMU"

export type OrderGoods = BaseDataFields & {
  goods_name_kk: string
  goods_name_en: string
  goods_name_ru: string
  goods_image: string
}

export type OrderItem = BaseDataFields & {
  order_no: string
  order_goods: OrderGoods[]
  market_company: MarketCompany
  total_weight: string
  amount: string
  amount_currency: string
  is_payed: boolean
}

export type OrderStatus = BaseDataFields & {
  status_type: OrdersStatuses
  order: OrderItem
}

export type OrdersStatusesResponse = BaseResponse<OrderStatus>
