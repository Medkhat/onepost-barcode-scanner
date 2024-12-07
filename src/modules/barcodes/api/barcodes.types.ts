import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrderByBarcode = BaseDataFields & {
  order_no: string
  full_address: string
  contact_phone: string
}

export type OrderListByBarcode = BaseResponse<OrderByBarcode>
