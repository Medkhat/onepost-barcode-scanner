import React, { useMemo } from "react"
import { CheckIcon, ChevronsUpDown } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  )

  console.log(options)

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
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => onChange(option.value)}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.sublabel}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FormAutocomplete
