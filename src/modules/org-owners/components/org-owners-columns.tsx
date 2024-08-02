import { ColumnDef } from "@tanstack/react-table"

import { OrgOwner } from "@/modules/org-owners/api/org-owners.types"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { Badge } from "@/shared/components/ui/badge"

export const orgOwnersColumns: ColumnDef<OrgOwner>[] = [
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
    accessorKey: "user.phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
      />
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
    cell: ({ row }) =>
      row.original.user.email ? (
        row.original.user.email
      ) : (
        <Badge className="bg-destructive/50">Email isn't provided</Badge>
      ),
  },
]
