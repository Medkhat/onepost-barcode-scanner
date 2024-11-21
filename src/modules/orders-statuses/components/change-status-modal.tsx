import { ElementRef, useRef, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { OrdersStatuses } from "@/modules/orders-statuses/api/orders-statuses.types"
import OrderStatusComponent from "@/modules/orders-statuses/components/order-status"
import { useOrderStatusLabels } from "@/modules/orders-statuses/hooks/use-orders-statuses-constants"
import { useOrdersStatusesStore } from "@/modules/orders-statuses/store/status.store"
import { Button } from "@/shared/components/ui/button"
import { DialogClose } from "@/shared/components/ui/dialog"
import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { cn } from "@/shared/lib/utils"

export default function ChangeStatusModal() {
  const { t: commonT } = useTranslation("common")
  const { t: ordersT } = useTranslation("orders")
  // const {
  //   queryParams: { pSize, page },
  // } = useQueryParams()
  const selectedOrderStatus = useOrdersStatusesStore(
    (state) => state.selectedOrderStatus
  )
  const statuses = useOrderStatusLabels()

  const closeRef = useRef<ElementRef<typeof DialogClose> | null>(null)
  const [selectedValue, setSelectedValue] = useState<OrdersStatuses>(
    selectedOrderStatus?.status_type as OrdersStatuses
  )

  // const qc = useQueryClient()
  // const changeStatusMut = useMutation({
  //   mutationFn: () =>
  //     changeOrderStatus(selectedOrderStatus?.id as string, {
  //       status_type: selectedValue,
  //     }),
  //   onSuccess: () => {
  //     qc.invalidateQueries({
  //       queryKey: ["statuses" + page + pSize],
  //     })
  //     toast.success(ordersT("changeStatusSuccess"))
  //     closeRef.current?.click()
  //   },
  // })

  const handleSave = () => {
    // changeStatusMut.mutate()
    toast.success(ordersT("changeStatusSuccess"))
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-2 mb-5 py-3">
        <h3 className="font-bold text-lg">
          {selectedOrderStatus?.order.order_no}
        </h3>
        <OrderStatusComponent
          status={selectedOrderStatus?.status_type as OrdersStatuses}
        />
      </div>
      <RadioGroup
        value={selectedValue}
        onValueChange={(value: OrdersStatuses) => setSelectedValue(value)}
      >
        {Object.keys(statuses).map((status) => (
          <StatusItem key={status} value={status as OrdersStatuses} />
        ))}
      </RadioGroup>
      <Button
        onClick={handleSave}
        // isLoading={changeStatusMut.isPending}
        disabled={
          // changeStatusMut.isPending ||
          selectedOrderStatus?.status_type === selectedValue
        }
      >
        {commonT("button.save")}
      </Button>
      <DialogClose ref={closeRef} />
    </Fragment>
  )
}

const borderColor: Record<OrdersStatuses, string> = {
  UNKNOWN: "border-r-gray-500",
  WAITING: "border-r-yellow-500",
  IN_WAREHOUSE: "border-r-blue-500",
  ON_THE_WAY: "border-r-purple-500",
  AT_THE_BORDER: "border-r-red-500",
  SORTED: "border-r-green-500",
  DELIVERED: "border-r-teal-500",
  IN_DEPARTMENT: "border-r-indigo-500",
  TAKEN: "border-r-pink-500",
}
function StatusItem({ value }: { value: OrdersStatuses }) {
  const statuses = useOrderStatusLabels()
  return (
    <Label
      className={cn(
        "flex items-center p-2 rounded-lg border border-input border-r-[12px] mb-1",
        borderColor[value]
      )}
    >
      <RadioGroupItem value={value} className="w-5 h-5" />
      <span className="ml-2">{statuses[value]}</span>
    </Label>
  )
}
