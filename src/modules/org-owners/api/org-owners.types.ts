import { z } from "zod"

import { UserFields } from "@/modules/auth/api/auth.types"
import { useStaffFormSchema } from "@/modules/staff/hooks/use-staff-form-schema"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type OrgOwner = BaseDataFields & {
  user: Omit<UserFields, "user">
  role: string
}

export type GetOrgOwnersResponse = BaseResponse<OrgOwner>

export type OrgOwnerPayload = z.infer<ReturnType<typeof useStaffFormSchema>>
