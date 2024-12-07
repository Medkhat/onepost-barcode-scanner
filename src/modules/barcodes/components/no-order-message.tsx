import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function NoOrderMessage() {
  const { t: barcodesT } = useTranslation("barcodes")

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <p className="mt-2 text-destructive-foreground">{barcodesT("noOrder")}</p>
  )
}
