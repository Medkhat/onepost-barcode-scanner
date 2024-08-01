import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import SearchInput from "@/shared/components/search"
import { Button } from "@/shared/components/ui/button"
import { FormControl } from "@/shared/components/ui/form"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import SpinnerIcon from "@/shared/icons/spinner"
import { cn } from "@/shared/lib/utils"
import { LabelValue } from "@/shared/types/common.types"

type FormAutocompleteProps = {
  options: LabelValue[]
  value: string
  placeholder?: string
  isLocalSearch?: boolean
  title: string
  onChange: (value: string) => void
  onScrollEnd?: () => void
  isFetchingNext?: boolean
  isLoading?: boolean
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  isLocalSearch,
  title,
  onScrollEnd,
  isFetchingNext,
  isLoading,
}) => {
  const { queryParams } = useQueryParams()
  const { t: commonT } = useTranslation("common")
  const [optionsHistory, setOptionsHistory] = useState<LabelValue[][]>([])
  const [selectedOption, setSelectedOption] = useState<LabelValue | null>(null)
  const [currentOptions, setCurrentOptions] = useState<LabelValue[]>(options)

  const filteredOptions = useMemo(() => {
    if (isLocalSearch && queryParams.autocomplete) {
      return currentOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(queryParams.autocomplete?.toLowerCase() as string)
      )
    }
    return currentOptions
  }, [currentOptions, isLocalSearch, queryParams.autocomplete])

  const handleSelectOption = useCallback(
    (option: LabelValue) => {
      if (option.subOptions && option.subOptions.length > 0) {
        setOptionsHistory((prevHistory) => [...prevHistory, currentOptions])
        setCurrentOptions(option.subOptions)
      } else {
        setSelectedOption(option)
      }
    },
    [currentOptions]
  )

  const handleBack = useCallback(() => {
    setOptionsHistory((prevHistory) => {
      const history = [...prevHistory]
      const previousOptions = history.pop()
      if (previousOptions) {
        setCurrentOptions(previousOptions)
        setSelectedOption(null)
      }
      return history
    })
  }, [])

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
      if (scrollTop + clientHeight >= scrollHeight) {
        onScrollEnd?.()
      }
    },
    [onScrollEnd]
  )

  useEffect(() => {
    if (options && !isLoading) {
      setCurrentOptions(options)
    }
  }, [options, isLoading])

  useEffect(() => {
    if (value && !selectedOption) {
      setSelectedOption(
        currentOptions.find((option) => option.value === value) || null
      )
    }
  }, [currentOptions, selectedOption, value])

  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "flex w-full justify-between",
              !selectedOption && "text-muted-foreground"
            )}
          >
            {value ? selectedOption?.label : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </SheetTrigger>
      <SheetContent className="p-6">
        <SheetHeader className="mb-3">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex items-center mb-4">
          {optionsHistory.length > 0 && (
            <Button variant="ghost" className="mr-1" onClick={handleBack}>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
            </Button>
          )}
          <div className="relative flex-1">
            <SearchInput queryStringName="autocomplete" delay={200} />
            {isLoading && (
              <SpinnerIcon className="animate-spin absolute right-3 top-2" />
            )}
          </div>
        </div>
        <div
          className="h-[calc(100svh-215px)] overflow-y-auto"
          onScroll={handleScroll}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Button
                variant="outline"
                value={option.value}
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className={cn(
                  "w-full mb-2",
                  option.value === selectedOption?.value &&
                    "bg-primary/20 text-primary border-primary hover:bg-primary/30"
                )}
              >
                <CheckIcon
                  className={cn(
                    "h-5 w-5 text-primary",
                    option.value === selectedOption?.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <div className="ml-5 text-left flex-1">
                  <p className="font-semibold text-md mb-1">{option.label}</p>
                  {option.sublabel && (
                    <span className="text-sm text-muted-foreground">
                      {option.sublabel} asdsdad
                    </span>
                  )}
                </div>
                {option.subOptions && option.subOptions.length > 0 && (
                  <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            ))
          ) : (
            <p className="text-center">No data</p>
          )}
          {isFetchingNext && (
            <div className="py-5 flex items-center justify-center">
              <p className="mr-3">{commonT("loading")}</p>
              <SpinnerIcon className="animate-spin" />
            </div>
          )}
        </div>

        <SheetClose asChild>
          <Button
            type="button"
            className="w-full mt-5"
            disabled={!selectedOption}
            onClick={() => {
              onChange(selectedOption?.value as string)
            }}
          >
            {commonT("button.selectAndClose")}
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default FormAutocomplete
