import { z } from "zod"

import { UserFields } from "@/modules/auth/api/auth.types"
import { useOrgFormSchema } from "@/modules/organizations/components/form/form-schema"
import { AreaItem } from "@/shared/api/areas.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrgOwner = BaseDataFields & {
  user: Omit<UserFields, "user">
  role: string
}

export type GetOrgOwnersResponse = BaseResponse<OrgOwner>

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
  }
export type OrganizationListResponse = BaseResponse<OrganizationItem>
