import { ColumnDef } from "@tanstack/react-table"

import { OrganizationItem } from "@/modules/organizations/api/organizations.types"
import WorkingHoursTrigger from "@/modules/organizations/components/working-hours-trigger"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { DataTableRowActions } from "@/shared/components/table/data-table-row-actions"
import i18n from "@/shared/i18n/i18n.config"
import { Locale } from "@/shared/types/common.types"

export const organizationsColumns: ColumnDef<OrganizationItem>[] = [
  {
    id: "workingHours",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.workingHours"
      />
    ),
    cell: ({ row }) => (
      <WorkingHoursTrigger orgId={row.original.id as string} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "station_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.name"
      />
    ),
    cell: ({ row }) => (
      <span className="min-w-32 line-clamp-2">{row.original.station_name}</span>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "station_code",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.code"
      />
    ),
  },
  {
    accessorKey: "station_price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.price"
      />
    ),
    cell: ({ row }) => (
      <span>
        {row.getValue("station_price")} {row.original.price_currency}
      </span>
    ),
  },
  {
    accessorKey: "station_tel",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
      />
    ),
  },
  {
    accessorKey: "station_owner",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.owner"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {row.original.station_owner.user.first_name}
        <br />
        {row.original.station_owner.user.last_name}
      </span>
    ),
  },
  {
    accessorKey: "station_area",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.area"
      />
    ),
    cell: ({ row }) => {
      const lang = i18n.language as Locale
      return (
        <span className="whitespace-nowrap">
          {row.original.station_area.parent_area[`area_name_${lang}`]}
          ,
          <br />
          {row.original.station_area[`area_name_${lang}`]}
        </span>
      )
    },
  },
  {
    accessorKey: `address_${i18n.language as Locale}`,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.address"
      />
    ),
  },
  {
    accessorKey: "station_area.post_code",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.postalCode"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
