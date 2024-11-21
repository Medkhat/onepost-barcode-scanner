import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { AreaItem } from "@/shared/api/areas.types"
import { DEFAULT_PAGE_SIZE } from "@/shared/lib/constants"
import { LabelValue, Locale } from "@/shared/types/common.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert areas to LabelValue
 * @param areas
 * @param lang
 */
export function convertAreas(
  areas: AreaItem[] = [],
  lang: Locale
): LabelValue[] {
  return areas.map((area) => ({
    value: area.id,
    label: area[`area_name_${lang}`],
    subOptions: convertAreas(area.sub_area, lang),
  }))
}

/**
 * Get pageCount from total and pageSize
 * @param total
 * @param pageSize
 */
export function getPageCount(
  total: number = 0,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  return Math.ceil(total / pageSize)
}

/**
 * Format a phone number
 * @param phoneNumber - The phone number
 * @example formatPhoneNumber("+77777777777") // +7 (777) 777-77-77
 */
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) {
    return ""
  }
  const newPhone = phoneNumber.startsWith("+7")
    ? phoneNumber
    : `+7${phoneNumber}`
  const code = newPhone.slice(0, 2)
  const area = newPhone.slice(2, 5)
  const mid = newPhone.slice(5, 8)
  const end1 = newPhone.slice(8, 10)
  const end2 = newPhone.slice(10, 12)
  return `${code} (${area}) ${mid}-${end1}-${end2}`
}
