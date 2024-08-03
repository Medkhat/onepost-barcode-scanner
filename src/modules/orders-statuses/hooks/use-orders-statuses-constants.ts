import { useTranslation } from "react-i18next"

import { OrdersStatuses } from "@/modules/orders-statuses/api/orders-statuses.types"

export const useOrderStatusLabels = (): Record<OrdersStatuses, string> => {
  const { t: ordersT } = useTranslation("orders")
  return {
    UNKNOWN: ordersT("statuses.unknown"),
    WAITING: ordersT("statuses.waiting"),
    IN_WAREHOUSE: ordersT("statuses.inWarehouse"),
    ON_THE_WAY: ordersT("statuses.onTheWay"),
    AT_THE_BORDER: ordersT("statuses.atTheBorder"),
    SORTED: ordersT("statuses.sorted"),
    DELIVERED: ordersT("statuses.delivered"),
    IN_DEPARTMENT: ordersT("statuses.inDepartment"),
    TAKEN: ordersT("statuses.taken"),
  }
}
