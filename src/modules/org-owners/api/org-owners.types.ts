import { USER_ROLE, UserFields } from "@/modules/auth/api/auth.types"
import { OrgOwnerFormFields } from "@/modules/org-owners/hooks/use-org-owner-form-schema"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrgOwner = BaseDataFields & {
  user: Omit<UserFields, "user">
  role: USER_ROLE
}

export type GetOrgOwnersResponse = BaseResponse<OrgOwner>

export type OrgOwnerPayload = OrgOwnerFormFields
