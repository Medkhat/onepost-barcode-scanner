import { create } from "zustand"

import { OrderByBarcode } from "@/modules/barcodes/api/barcodes.types"

type BarcodesStore = {
  orders: OrderByBarcode[]
  setOrder: (order: OrderByBarcode) => void
}

export const useBarcodesStore = create<BarcodesStore>((set) => ({
  orders: [],
  setOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }))
  },
}))

export const setOrder = useBarcodesStore.getState().setOrder
