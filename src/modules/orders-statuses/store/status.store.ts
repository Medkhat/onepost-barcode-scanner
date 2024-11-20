import { create } from "zustand"

import { OrderStatusListItem } from "@/modules/orders-statuses/api/orders-statuses.types"

type OrdersStatusesStore = {
  selectedOrderStatus: OrderStatusListItem | null
}

export const useOrdersStatusesStore = create<OrdersStatusesStore>(() => ({
  selectedOrderStatus: null,
}))
