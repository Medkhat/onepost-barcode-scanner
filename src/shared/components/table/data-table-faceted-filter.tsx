import { useEffect, useState } from "react"
import { CheckIcon, CirclePlusIcon } from "lucide-react"

import { BaseQueryParams } from "@/shared/api/types"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { cn } from "@/shared/lib/utils"
import { LabelValue } from "@/shared/types/common.types"

interface DataTableFacetedFilterProps {
  title?: string
  options?: LabelValue[]
  filterKey?: string
}

export function DataTableFacetedFilter({
  title,
  filterKey,
  options = [],
}: DataTableFacetedFilterProps) {
  const { queryParams, navToNewParams } = useQueryParams()
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  useEffect(() => {
    if (!queryParams[filterKey as keyof BaseQueryParams]) {
      setSelectedValue(null)
    }
  }, [filterKey, queryParams])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValue && (
            <Badge
              variant="secondary"
              className="ml-1 rounded-sm px-1 font-normal"
            >
              {options.find((option) => selectedValue === option.value)?.label}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = option.value === selectedValue
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValue(null)
                      } else {
                        setSelectedValue(option.value)
                      }
                      navToNewParams({
                        [filterKey as string]: option.value,
                      })
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.Icon && (
                      <option.Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValue(null), navToNewParams({})
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
