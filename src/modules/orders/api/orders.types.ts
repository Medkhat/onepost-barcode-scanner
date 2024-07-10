import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrderGoods = BaseDataFields & {
  goods_name_kz: string
  goods_name_en: string
  goods_name_cn: string
  goods_image: string
}

export type OrderItem = BaseDataFields & {
  order_no: string
  order_goods: OrderGoods[]
  market_company: string
  total_weight: string
  amount: string
  amount_currency: string
  is_payed: boolean
}

export type OrdersResponse = BaseResponse<OrderItem>
