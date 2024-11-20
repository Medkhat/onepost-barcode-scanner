import { Link } from "react-router-dom"
import { ColumnDef } from "@tanstack/react-table"

import { OrganizationListItem } from "@/modules/organizations/api/organizations.types"
import OrganizationType from "@/modules/organizations/components/organization-type"
import { DataTableColumnHeader } from "@/shared/components/table/data-table-column-header"
import { Button } from "@/shared/components/ui/button"
import { RouteNames } from "@/shared/lib/constants"
import { formatPhoneNumber } from "@/shared/lib/utils"

export const organizationsColumns: ColumnDef<OrganizationListItem>[] = [
  {
    accessorKey: "station_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.name"
      />
    ),
    cell: ({ row }) => (
      <Link to={RouteNames.ORGANIZATIONS + "/" + row.original.id}>
        <Button variant="link" className="whitespace-nowrap">
          {row.original.station_name}
        </Button>
      </Link>
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
    cell: ({ row }) => (
      <Link to={RouteNames.ORGANIZATIONS + "/" + row.original.id}>
        <Button variant="link" className="whitespace-nowrap">
          {row.original.station_code}
        </Button>
      </Link>
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
        {row.original.station_owner.user.first_name +
          " " +
          row.original.station_owner.user.last_name}
      </span>
    ),
  },
  {
    accessorKey: "station_type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.org.type"
      />
    ),
    cell: ({ row }) => <OrganizationType type={row.original.station_type} />,
  },
  {
    accessorKey: "station_tel",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        titleKey="tableHeaderTitles.phone"
      />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatPhoneNumber("+7" + row.original.station_tel)}
      </span>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => (
  //     <DataTableRowActions
  //       onClickEdit={() =>
  //         useOrganizationsStore.setState({
  //           formModal: true,
  //           organization: row.original,
  //         })
  //       }
  //     />
  //   ),
  // },
]
