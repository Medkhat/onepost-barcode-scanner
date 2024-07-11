import { ColumnDef } from "@tanstack/react-table"

import { UsersData } from "@/modules/users-data/api/users-data.types"
import ChangeUsersDataStatus from "@/modules/users-data/components/change-user-status-button"
import UsersDataStatus from "@/modules/users-data/components/users-data-status"
import CellImage from "@/shared/components/table/cell-image"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"

export const usersDataColumns: ColumnDef<UsersData>[] = [
  {
    accessorKey: "real_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.name"
      />
    ),
  },
  {
    id: "idCardFront",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.usersData.idCardFront"
      />
    ),
    cell: ({ row }) => (
      <CellImage
        isI18nTitle
        title="tableHeaderTitles.usersData.idCardFront"
        image={row.original.id_card_front}
        className="w-16 h-8 object-cover"
      />
    ),
  },
  {
    id: "idCardBack",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.usersData.idCardBack"
      />
    ),
    cell: ({ row }) => (
      <CellImage
        isI18nTitle
        title="tableHeaderTitles.usersData.idCardBack"
        image={row.original.id_card_front}
        className="w-16 h-8 object-cover"
      />
    ),
  },
  {
    id: "signature",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.usersData.signature"
      />
    ),
    cell: ({ row }) => (
      <CellImage
        isI18nTitle
        title="tableHeaderTitles.usersData.signature"
        image={row.original.signature}
        className="w-16 h-8 object-cover"
      />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
        className="h-8"
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
        className="h-8"
      />
    ),
    cell: ({ row }) => <UsersDataStatus status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ChangeUsersDataStatus usersData={row.original} />,
  },
]
