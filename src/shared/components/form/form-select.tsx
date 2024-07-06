import React from "react"

import { FormControl } from "@/shared/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { LabelValue } from "@/shared/types/common.types"

interface FormSelectProps {
  onValueChange: (value: string) => void
  defaultValue: string
  placeholder: string
  options: LabelValue[]
  isFormItem?: boolean
}

const FormSelect: React.FC<FormSelectProps> = ({
  onValueChange,
  defaultValue,
  placeholder,
  options,
  isFormItem,
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      {isFormItem ? (
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
      ) : (
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FormSelect
