import { ColumnDef } from "@tanstack/react-table"

import { OrderByBarcode } from "@/modules/barcodes/api/barcodes.types"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { formatPhoneNumber } from "@/shared/lib/utils"

export const printedBarcodesColumns: ColumnDef<OrderByBarcode>[] = [
  {
    accessorKey: "order_no",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.order.no"
      />
    ),
  },
  {
    accessorKey: "contact_phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
      />
    ),
    cell: ({ row }) => formatPhoneNumber(row.original.contact_phone),
  },
  {
    accessorKey: "full_address",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.address"
        className="h-8"
      />
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ChangeUsersDataStatus usersData={row.original} />,
  // },
]
