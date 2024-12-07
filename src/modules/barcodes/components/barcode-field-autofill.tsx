import { Fragment, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMutation } from "@tanstack/react-query"

import { findOrderByBarcode } from "@/modules/barcodes/api/barcodes-requests"
import NoOrderMessage from "@/modules/barcodes/components/no-order-message"
import { setOrder } from "@/modules/barcodes/store/barcodes.store"
import { Input } from "@/shared/components/ui/input"
import SpinnerIcon from "@/shared/icons/spinner"

export default function BarcodeFieldAutofill() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nativeEvent = e.nativeEvent as InputEvent
    if (!nativeEvent.inputType) {
      if (isEmptyResult) {
        setIsEmptyResult(false)
      }
      setInputValue(e.target.value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only keyboard shortcuts (like Ctrl+A, Ctrl+C)
    if (!e.ctrlKey && !e.metaKey) {
      e.preventDefault()
    }
  }
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (inputValue.length > 0) {
      findOrderMutation.mutate(inputValue)
    }
  }, [findOrderMutation, inputValue])

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current?.focus()
    }

    // Initial focus
    handleFocus()
    document.addEventListener("click", handleFocus)
    return () => {
      document.removeEventListener("click", handleFocus)
    }
  }, [])

  return (
    <Fragment>
      <Input
        value={inputValue}
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={barcodesT("scanTheBarcode")}
      />
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
