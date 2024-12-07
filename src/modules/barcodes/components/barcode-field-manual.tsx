import { Fragment, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMutation } from "@tanstack/react-query"
import { CornerDownLeftIcon } from "lucide-react"

import { findOrderByBarcode } from "@/modules/barcodes/api/barcodes-requests"
import NoOrderMessage from "@/modules/barcodes/components/no-order-message"
import { setOrder } from "@/modules/barcodes/store/barcodes.store"
import { Input } from "@/shared/components/ui/input"
import SpinnerIcon from "@/shared/icons/spinner"

export default function BarcodeFieldManual() {
  const { t: barcodesT } = useTranslation("barcodes")
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState("")
  const [isEmptyResult, setIsEmptyResult] = useState(false)

  const findOrderMutation = useMutation({
    mutationFn: (value: string) => findOrderByBarcode(value),
    onSuccess: (data) => {
      if (data.results && data.results.length > 0) {
        setOrder(data.results[0])
        setInputValue("")
      } else {
        setIsEmptyResult(true)
      }
    },
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.length > 0) {
        findOrderMutation.mutate(inputValue)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmptyResult) {
      setIsEmptyResult(false)
    }
    setInputValue(e.target.value)
  }

  return (
    <Fragment>
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder={barcodesT("enterTheBarcode")}
        />
        <div className="absolute right-1 top-[7px] flex items-center py-1 px-2 border rounded">
          <CornerDownLeftIcon className="w-4 h-4" />
          <span className="text-xs">Enter</span>
        </div>
      </div>
      {findOrderMutation.isPending && (
        <div className="flex items-center mt-2">
          <SpinnerIcon className="animate-spin" />
          <span className="ml-2">{barcodesT("loadingOrder")}</span>
        </div>
      )}
      {isEmptyResult && <NoOrderMessage />}
    </Fragment>
  )
}
