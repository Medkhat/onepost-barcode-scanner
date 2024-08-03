import { z } from "zod"

import { OrgOwner } from "@/modules/org-owners/api/org-owners.types"
import { useOrgFormSchema } from "@/modules/organizations/hooks/use-form-schema"
import { AreaItem } from "@/shared/api/areas.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrganizationFields = z.infer<ReturnType<typeof useOrgFormSchema>>

export type OrganizationFormFields = Omit<
  OrganizationFields,
  "station_price" | "latitude" | "longitude" | "station_type"
> & {
  station_price: number
  latitude: number
  longitude: number
  station_type: number
}

export type OrganizationItem = BaseDataFields &
  Omit<
    OrganizationFields,
    "station_owner" | "station_area" | "station_type"
  > & {
    station_owner: OrgOwner
    station_area: AreaItem & {
      parent_area: AreaItem
    }
    station_region: AreaItem
    work_times: WorkingHour[]
    station_type: number
  }

export type OrganizationListResponse = BaseResponse<OrganizationItem>

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
