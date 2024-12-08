import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { DataTablePagination } from "@/shared/components/table/data-table-pagination"
import { DataTableToolbar } from "@/shared/components/table/data-table-toolbar"
import { Skeleton } from "@/shared/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { LabelValue } from "@/shared/types/common.types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  pageCount?: number
  isLoading?: boolean
  inputPlaceholder?: string
  filters?: LabelValue[]
  children?: React.ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  pageCount = 1,
  isLoading,
  inputPlaceholder,
  filters,
  children,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    pageCount,
    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="mt-5 space-y-4">
      <div className="sm:flex items-center justify-between gap-5">
        {inputPlaceholder && (
          <DataTableToolbar
            filters={filters}
            inputPlaceholder={inputPlaceholder}
          />
        )}
        {children}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from(
                { length: table.getState().pagination.pageSize },
                (_, item) => (
                  <TableRow key={item}>
                    {Array.from({ length: columns.length }, (_, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount === undefined && <DataTablePagination table={table} />}
    </div>
  )
}
