import { FilePenLineIcon } from "lucide-react"

import { OrderStatus } from "@/modules/orders-statuses/api/orders-statuses.types"
import { useOrdersStatusesStore } from "@/modules/orders-statuses/store/status.store"
import { Button } from "@/shared/components/ui/button"
import { DialogTrigger } from "@/shared/components/ui/dialog"

export default function ChangeStatusButton({ order }: { order: OrderStatus }) {
  const handleClick = () => {
    useOrdersStatusesStore.setState({ selectedOrderStatus: order })
  }
  return (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={handleClick}
      >
        <FilePenLineIcon className="h-4 w-4" />
        <span className="sr-only">Change status</span>
      </Button>
    </DialogTrigger>
  )
}
