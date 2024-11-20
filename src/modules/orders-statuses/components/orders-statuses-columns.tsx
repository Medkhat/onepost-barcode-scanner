import { ColumnDef } from "@tanstack/react-table"

import { OrderStatusListItem } from "@/modules/orders-statuses/api/orders-statuses.types"
import ChangeStatusButton from "@/modules/orders-statuses/components/change-status-button"
import OrderCompanyLogo from "@/modules/orders-statuses/components/order-company"
import OrderStatusComponent from "@/modules/orders-statuses/components/order-status"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"

export const ordersStatusesColumns: ColumnDef<OrderStatusListItem>[] = [
  {
    accessorKey: "order.order_no",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.order.no"
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "order.total_weight",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.order.totalWeight"
      />
    ),
    cell: ({ row }) => (
      <span>{Number(row.original.order.total_weight)} kg</span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "status_type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.status"
      />
    ),
    cell: ({ row }) => (
      <OrderStatusComponent status={row.original.status_type} />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "order.market_company",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.company"
      />
    ),
    cell: ({ row }) => (
      <OrderCompanyLogo company={row.original.order.market_company} />
    ),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <ChangeStatusButton order={row.original} />,
  },
]
