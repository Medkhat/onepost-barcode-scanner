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

export type MarketCompany = "PINDUODUO" | "TEMU"

export type OrderListItem = BaseDataFields & {
  order_no: string
  extra_no: string
  market_company: MarketCompany
  full_address: string
  contact_phone: string
  total_weight: string
  station: string
}

export type OrderStatusListItem = BaseDataFields & {
  status_type: OrdersStatuses
  order: OrderListItem
}

export type OrdersStatusesResponse = BaseResponse<OrderStatusListItem>

export type OrderGoods = BaseDataFields & {
  goods_name_kk: string
  goods_name_en: string
  goods_name_ru: string
  goods_image: string
  order: string
  goods_price: string
  goods_count: number
}

export type OrderItem = OrderListItem & {
  is_payed: boolean
  order_goods: OrderGoods[]
}

export type OrderStatusItem = Omit<OrderStatusListItem, "order"> & {
  order: OrderItem
}
