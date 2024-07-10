import { ColumnDef } from "@tanstack/react-table"

import { OrganizationItem } from "@/modules/organizations/api/organizations.types"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { DataTableRowActions } from "@/shared/components/table/data-table-row-actions"
import { Checkbox } from "@/shared/components/ui/checkbox"
import i18n from "@/shared/i18n/config"
import { getLocaleKey } from "@/shared/lib/utils"
import { Locale } from "@/shared/types/common.types"

export const organizationsColumns: ColumnDef<OrganizationItem>[] = [
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
          {
            row.original.station_area.parent_area[
              `area_name_${getLocaleKey(lang)}`
            ]
          }
          ,
          <br />
          {row.original.station_area[`area_name_${getLocaleKey(lang)}`]}
        </span>
      )
    },
  },
  {
    accessorKey: `address_${getLocaleKey(i18n.language as Locale)}`,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.address"
      />
    ),
  },
  {
    accessorKey: "post_code",
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
