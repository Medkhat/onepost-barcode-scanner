import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { AreaItem } from "@/shared/api/areas.types"
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
    label: area[`area_name_${lang === "kk" ? "kz" : lang}`],
    subOptions: convertAreas(area.sub_area, lang),
  }))
}

/**
 * Get locale key
 */
export function getLocaleKey(lang: Locale) {
  return lang === "kk" ? "kz" : lang
}
