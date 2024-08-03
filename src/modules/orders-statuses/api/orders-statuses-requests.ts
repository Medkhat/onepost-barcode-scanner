import {
  OrdersStatuses,
  OrdersStatusesResponse,
} from "@/modules/orders-statuses/api/orders-statuses.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getOrdersStatuses = async (params: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(
      BaseApiPaths.EXPRESS
    ).get<OrdersStatusesResponse>("/order-status/", {
      params,
    })
  ).data
}

export const changeOrderStatus = async (
  orderId: string,
  payload: { status_type: OrdersStatuses }
) => {
  return (
    await axiosInstanceWithToken(
      BaseApiPaths.EXPRESS
    ).put<OrdersStatusesResponse>(`/order-status/${orderId}/`, payload)
  ).data
}
