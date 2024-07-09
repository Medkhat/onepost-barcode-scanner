import { useTranslation } from "react-i18next"
import { Table } from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { DEFAULT_PAGE_SIZE } from "@/shared/lib/constants"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { t: commonT } = useTranslation("common")
  const {
    queryParams: { page, pSize },
    navToNewParams,
  } = useQueryParams()

  const handleNext = () => {
    table.nextPage()
    navToNewParams({ page: page ? page + 1 : 1, pSize })
  }
  const handlePrev = () => {
    table.previousPage()
    navToNewParams({ page: page ? page - 1 : 1, pSize })
  }
  const handleLast = () => {
    table.setPageIndex(table.getPageCount() - 1)
    navToNewParams({ page: table.getPageCount(), pSize })
  }
  const handleFirst = () => {
    table.setPageIndex(0)
    navToNewParams({ page: 1, pSize })
  }
  const handlePSizeChange = (value: string) => {
    table.setPageSize(Number(value))
    navToNewParams({ page: 1, pSize: Number(value) })
  }

  return (
    <div className="flex items-center justify-between overflow-auto px-2">
      <div className="hidden flex-1 text-sm text-muted-foreground sm:block">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium sm:block">
            {commonT("tablePagination.rowsPerPage")}
          </p>
          <Select
            value={`${pSize ?? DEFAULT_PAGE_SIZE}`}
            onValueChange={handlePSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" align="center">
              {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {commonT("tablePagination.page")} {page} / {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleFirst}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePrev}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNext}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleLast}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
