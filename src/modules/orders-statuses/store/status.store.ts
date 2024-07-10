import { create } from "zustand"

import { OrderStatus } from "@/modules/orders-statuses/api/orders-statuses.types"

type OrdersStatusesStore = {
  selectedOrderStatus: OrderStatus | null
}

export const useOrdersStatusesStore = create<OrdersStatusesStore>(() => ({
  selectedOrderStatus: null,
}))
