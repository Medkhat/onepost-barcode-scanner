import { UserFields } from "@/modules/auth/api/auth.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrgOwner = BaseDataFields & {
  user: Omit<UserFields, "user">
  role: string
}

export type GetOrgOwnersResponse = BaseResponse<OrgOwner>
