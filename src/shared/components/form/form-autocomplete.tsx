import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { CheckIcon, ChevronsUpDown } from "lucide-react"

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

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "flex w-full justify-between",
              !value && "text-muted-foreground"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={commonT("search")} />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandList>
            {options.map((option) => (
              <CommandItem
                value={option.value}
                key={option.value}
                onSelect={() => onChange(option.value)}
              >
                <CheckIcon
                  className={cn(
                    "h-5 w-5 text-primary",
                    option.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="ml-2">
                  <p className="font-semibold text-md mb-1">{option.label}</p>
                  {option.sublabel && (
                    <span className="text-sm text-muted-foreground">
                      {option.sublabel}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FormAutocomplete
