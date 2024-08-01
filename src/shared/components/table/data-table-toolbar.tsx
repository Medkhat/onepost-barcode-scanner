import { useTranslation } from "react-i18next"
import { Table } from "@tanstack/react-table"
import { XIcon } from "lucide-react"

import { BaseQueryParams } from "@/shared/api/types"
import SearchInput from "@/shared/components/search"
import { DataTableFacetedFilter } from "@/shared/components/table/data-table-faceted-filter"
import { Button } from "@/shared/components/ui/button"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { LabelValue } from "@/shared/types/common.types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  inputPlaceholder?: string
  filters?: LabelValue[]
}

export function DataTableToolbar<TData>({
  table,
  inputPlaceholder,
  filters,
}: DataTableToolbarProps<TData>) {
  const { t: commonT } = useTranslation("common")
  const { navToNewParams } = useQueryParams()
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <SearchInput
          placeholder={inputPlaceholder}
          className="w-full md:w-1/2"
          delay={500}
        />
        <div className="flex gap-x-2">
          {filters &&
            filters.map((filter) => (
              <DataTableFacetedFilter
                key={filter.value}
                column={table.getColumn(filter.value)}
                title={filter.label}
                options={filter.subOptions}
              />
            ))}
        </div>
        {filters && (
          <Button
            variant="ghost"
            onClick={() =>
              navToNewParams(
                filters?.reduce((acc, filter) => {
                  acc[filter.value as keyof BaseQueryParams] = undefined
                  return acc
                }, {} as BaseQueryParams) as BaseQueryParams
              )
            }
            className="h-8 px-2 lg:px-3"
          >
            {commonT("button.reset")}
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
