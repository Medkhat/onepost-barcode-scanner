import { ColumnDef } from "@tanstack/react-table"

import { StaffItem } from "@/modules/staff/api/staff.types"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"

export const staffColumns: ColumnDef<StaffItem>[] = [
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.fullName"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {row.original.user.first_name + " " + row.original.user.last_name}
      </span>
    ),
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.email"
      />
    ),
  },
  {
    accessorKey: "user.phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
      />
    ),
  },
]
