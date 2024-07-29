import { BaseDataFields } from "@/shared/api/types"

export type AreaFields = {
  id: string
  area_name_kk: string
  area_name_en: string
  area_name_ru: string
  area_code: string
  area_type: number
  country: string
  post_code: string
  sub_area: AreaFields[]
}

export type AreaItem = BaseDataFields & AreaFields

export type GetAreasResponse = AreaItem[]
