import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDebounce } from "use-debounce"

import { Input } from "@/shared/components/ui/input"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { cn } from "@/shared/lib/utils"

type SearchProps = {
  placeholder?: string
  queryStringName?: string
  className?: string
  delay?: number
}
export default function SearchInput({
  placeholder,
  queryStringName = "search",
  className,
  delay = 500,
}: SearchProps) {
  const { navToNewParams } = useQueryParams()
  const { t: commonT } = useTranslation("common")
  const [value, setValue] = useState("")
  const [debValue] = useDebounce(value, delay)

  useEffect(() => {
    navToNewParams({ [queryStringName]: debValue })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debValue])

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={`${placeholder ?? commonT("search")}...`}
      className={cn("w-full", className)}
    />
  )
}
