import { z } from "zod"

import { UserFields } from "@/modules/auth/api/auth.types"
import { useStaffFormSchema } from "@/modules/staff/hooks/use-staff-form-schema"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export type StaffItem = BaseDataFields & {
  user: UserFields
  role: string
}

export type StaffResponse = BaseResponse<StaffItem>

export type CreateStaffPayload = z.infer<ReturnType<typeof useStaffFormSchema>>
