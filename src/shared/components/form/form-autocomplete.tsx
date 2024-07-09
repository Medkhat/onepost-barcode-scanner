import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command"
import { FormControl } from "@/shared/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { cn } from "@/shared/lib/utils"
import { LabelValue } from "@/shared/types/common.types"

type FormAutocompleteProps = {
  options: LabelValue[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const FormAutocomplete: React.FC<FormAutocompleteProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const { t: commonT } = useTranslation("common")
  const [currentOptions, setCurrentOptions] = useState<LabelValue[]>(options)
  const [optionsHistory, setOptionsHistory] = useState<LabelValue[][]>([])

  const selectedOption = useMemo(
    () => currentOptions.find((option) => option.value === value),
    [currentOptions, value]
  )

  const handleSelectOption = useCallback(
    (option: LabelValue) => {
      if (option.subOptions && option.subOptions.length > 0) {
        setOptionsHistory((prevHistory) => [...prevHistory, currentOptions])
        setCurrentOptions(option.subOptions)
      } else {
        onChange(option.value)
      }
    },
    [currentOptions, onChange]
  )

  const handleBack = useCallback(() => {
    setOptionsHistory((prevHistory) => {
      const history = [...prevHistory]
      const previousOptions = history.pop()
      if (previousOptions) {
        setCurrentOptions(previousOptions)
      }
      return history
    })
  }, [])

  useEffect(() => {
    if (options.length > 0 && currentOptions.length === 0) {
      setCurrentOptions(options)
    }
  }, [options, currentOptions])

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "flex w-full justify-between",
              !selectedOption && "text-muted-foreground"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <div className="flex items-center">
            {optionsHistory.length > 0 && (
              <Button variant="ghost" className="mr-1" onClick={handleBack}>
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
              </Button>
            )}
            <CommandInput className="flex-1" placeholder={commonT("search")} />
          </div>
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandList>
            {currentOptions.map((option) => (
              <CommandItem
                value={option.value}
                key={option.value}
                onSelect={() => handleSelectOption(option)}
              >
                <CheckIcon
                  className={cn(
                    "h-5 w-5 text-primary",
                    option.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex-1 ml-2">
                  <p className="font-semibold text-md mb-1">{option.label}</p>
                  {option.sublabel && (
                    <span className="text-sm text-muted-foreground">
                      {option.sublabel}
                    </span>
                  )}
                </div>
                {option.subOptions && option.subOptions.length > 0 && (
                  <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FormAutocomplete
