import { UserFields } from "@/modules/auth/api/auth.types"
import { BaseDataFields, BaseResponse } from "@/shared/api/types"

export enum UserStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export type ChangeUserStatusPayload = Pick<UsersData, "status" | "comment">

export type UsersData = BaseDataFields & {
  real_name: string
  id_card_front: string
  id_card_back: string
  signature: string
  status: UserStatus
  address: string
  phone: string
  user: UserFields
  comment: string
}

export type UsersDataResponse = BaseResponse<UsersData>
