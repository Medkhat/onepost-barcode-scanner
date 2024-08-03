import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { XIcon } from "lucide-react"

import { BaseQueryParams } from "@/shared/api/types"
import SearchInput from "@/shared/components/search"
import { DataTableFacetedFilter } from "@/shared/components/table/data-table-faceted-filter"
import { Button } from "@/shared/components/ui/button"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { LabelValue } from "@/shared/types/common.types"

interface DataTableToolbarProps {
  inputPlaceholder?: string
  filters?: LabelValue[]
}

export function DataTableToolbar({
  inputPlaceholder,
  filters,
}: DataTableToolbarProps) {
  const { t: commonT } = useTranslation("common")
  const { queryParams, navToNewParams } = useQueryParams()
  const [hasFilters, setHasFilters] = useState(false)

  useEffect(() => {
    let hasFilters = false
    filters?.forEach((filter) => {
      if (queryParams[filter.value as keyof BaseQueryParams]) {
        hasFilters = true
      }
    })
    setHasFilters(hasFilters)
  }, [filters, queryParams])

  return (
    <div className="flex-1 flex items-center justify-between mb-2 sm:mb-0">
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
                title={filter.label}
                options={filter.subOptions}
                filterKey={filter.value}
              />
            ))}
        </div>
        {hasFilters && (
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
