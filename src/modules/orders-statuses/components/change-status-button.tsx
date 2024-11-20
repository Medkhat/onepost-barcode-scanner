import { Edit3Icon } from "lucide-react"

import { OrderStatusListItem } from "@/modules/orders-statuses/api/orders-statuses.types"
import { useOrdersStatusesStore } from "@/modules/orders-statuses/store/status.store"
import { Button } from "@/shared/components/ui/button"
import { DialogTrigger } from "@/shared/components/ui/dialog"

export default function ChangeStatusButton({
  order,
}: {
  order: OrderStatusListItem
}) {
  const handleClick = () => {
    useOrdersStatusesStore.setState({ selectedOrderStatus: order })
  }
  return (
    <DialogTrigger asChild>
      <Button variant="secondary" size="icon" onClick={handleClick}>
        <Edit3Icon className="w-5 h-5" />
      </Button>
    </DialogTrigger>
  )
}
