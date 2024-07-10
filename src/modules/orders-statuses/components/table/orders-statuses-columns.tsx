import { ColumnDef } from "@tanstack/react-table"
import { CheckCheckIcon, CircleXIcon } from "lucide-react"

import { OrderStatus } from "@/modules/orders-statuses/api/orders-statuses.types"
import ChangeStatusButton from "@/modules/orders-statuses/components/table/change-status-button"
import OrderCompanyLogo from "@/modules/orders-statuses/components/table/order-company"
import OrderStatusComponent from "@/modules/orders-statuses/components/table/order-status"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { Checkbox } from "@/shared/components/ui/checkbox"
import i18n from "@/shared/i18n/config"
import { getLocaleKey } from "@/shared/lib/utils"
import { Locale } from "@/shared/types/common.types"

export const ordersStatusesColumns: ColumnDef<OrderStatus>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "order_img",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} titleKey="tableHeaderTitles.img" />
    ),
    cell: ({ row }) => (
      <img
        src={row.original.order.order_goods[0].goods_image}
        alt={
          row.original.order.order_goods[0][
            `goods_name_${getLocaleKey(i18n.language as Locale)}`
          ]
        }
        className="w-8 h-8 rounded-lg"
      />
    ),
  },
  {
    id: "order_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.name"
      />
    ),
    cell: ({ row }) => (
      <span className="min-w-32 line-clamp-2">
        {
          row.original.order.order_goods[0][
            `goods_name_${getLocaleKey(i18n.language as Locale)}`
          ]
        }
      </span>
    ),
    enableSorting: true,
  },
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
    accessorKey: "order.status_type",
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
    accessorKey: "order.amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.price"
      />
    ),
    cell: ({ row }) =>
      row.original.order.amount + " " + row.original.order.amount_currency,
  },
  {
    accessorKey: "order.is_payed",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.payment"
      />
    ),
    cell: ({ row }) =>
      row.original.order.is_payed ? (
        <CheckCheckIcon className="w-7 h-7 text-green-600" />
      ) : (
        <CircleXIcon className="w-7 h-7 text-destructive" />
      ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ChangeStatusButton order={row.original} />,
  },
]
