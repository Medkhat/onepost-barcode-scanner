import { z } from "zod"

import { OrgOwner } from "@/modules/org-owners/api/org-owners.types"
import { useOrgFormSchema } from "@/modules/organizations/hooks/use-form-schema"
import { STATION_TYPE } from "@/modules/organizations/hooks/use-station-type-label"
import { AreaItem } from "@/shared/api/areas.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrganizationFields = z.infer<ReturnType<typeof useOrgFormSchema>>
export type CreateOrgPayload = Omit<
  OrganizationFields,
  "station_price" | "latitude" | "longitude"
> & {
  station_price: number
  latitude: number
  longitude: number
}
export type OrganizationItem = BaseDataFields &
  Omit<OrganizationFields, "station_owner" | "station_area"> & {
    station_owner: OrgOwner
    station_area: Omit<AreaItem, "sub_area"> & {
      parent_area: Omit<AreaItem, "sub_area">
    }
    work_times: WorkingHour[]
    station_type: keyof typeof STATION_TYPE
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
