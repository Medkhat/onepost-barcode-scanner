import { OrdersStatuses } from "@/modules/orders-statuses/api/orders-statuses.types"
import { useOrderStatusLabels } from "@/modules/orders-statuses/lib/orders-statuses-constants"
import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"

const statusColors: Record<OrdersStatuses, string> = {
  UNKNOWN: "bg-gray-500",
  WAITING: "bg-yellow-500",
  IN_WAREHOUSE: "bg-blue-500",
  ON_THE_WAY: "bg-purple-500",
  AT_THE_BORDER: "bg-red-500",
  SORTED: "bg-green-500",
  DELIVERED: "bg-teal-500",
  IN_DEPARTMENT: "bg-indigo-500",
  TAKEN: "bg-pink-500",
}

export default function OrderStatusComponent({
  status,
}: {
  status: OrdersStatuses
}): JSX.Element {
  const statuses = useOrderStatusLabels()
  return <Badge className={cn(statusColors[status])}>{statuses[status]}</Badge>
}
