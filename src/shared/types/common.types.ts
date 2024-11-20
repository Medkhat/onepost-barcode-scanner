import { LucideIcon } from "lucide-react"

export type Locale = "kk" | "ru" | "en"

export type LabelValue = {
  label: string
  value: string
  sublabel?: string
  subOptions?: LabelValue[]
  Icon?: LucideIcon
}
