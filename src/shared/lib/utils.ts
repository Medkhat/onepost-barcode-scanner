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
