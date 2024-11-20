import { z } from "zod"

import { OrgOwner } from "@/modules/org-owners/api/org-owners.types"
import { useOrgFormSchema } from "@/modules/organizations/hooks/use-form-schema"
import { AreaItem } from "@/shared/api/areas.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"
import { Locale } from "@/shared/types/common.types"

export type OrganizationFields = z.infer<ReturnType<typeof useOrgFormSchema>>

export type OrganizationFormFields = Omit<
  OrganizationFields,
  | "latitude"
  | "longitude"
  | "station_type"
  | "address_kk"
  | "address_en"
  | "address_ru"
> & {
  station_address: OrganizationAddress[]
  latitude: number
  longitude: number
  station_type: number
}

export type OrganizationListItem = BaseDataFields &
  Omit<
    OrganizationFields,
    | "station_owner"
    | "station_area"
    | "station_type"
    | "address_kk"
    | "address_en"
    | "address_ru"
    | "post_code"
  > & {
    station_owner: OrgOwner
    station_address: OrganizationAddress[]
    work_times: WorkingHour[]
    station_type: keyof typeof STATION_VALUE_TYPE
    is_active: boolean
    is_deleted: boolean
  }

export type OrganizationListResponse = BaseResponse<OrganizationListItem>

export type OrganizationItem = OrganizationListItem & {
  station_area: AreaItem & {
    parent_area: AreaItem
  }
  station_region: AreaItem
}

export type OrganizationAddress = {
  lang: Locale
  address: string
}

export type WorkingHour = {
  day: number
  open_time: string
  close_time: string
}

export type OrgWorkingHours = {
  organization: string
  work_time: WorkingHour[]
}

export const STATION_TYPE_VALUE = {
  other: 1,
  station: 2,
  warehouse: 3,
  office: 4,
  market: 5,
}

export const STATION_VALUE_TYPE = {
  1: "other",
  2: "station",
  3: "warehouse",
  4: "office",
  5: "market",
}
