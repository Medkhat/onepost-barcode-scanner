import { OrderListByBarcode } from "@/modules/barcodes/api/barcodes.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"

export const findOrderByBarcode = async (barcode: string) => {
  return (
    await axiosInstanceWithToken(
      BaseApiPaths.EXPRESS_WAREHOUSE_STAFF
    ).get<OrderListByBarcode>(`/orders/`, {
      params: {
        search: barcode,
      },
    })
  ).data
}
