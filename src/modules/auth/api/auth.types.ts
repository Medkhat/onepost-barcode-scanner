import { BaseDataFields } from "@/shared/api/types"

export type USER_ROLE =
  | "ORGANIZATION_OWNER"
  | "ORGANIZATION_STAFF"
  | "WAREHOUSE_OWNER"
  | "WAREHOUSE_STAFF"
  | "STAFF"
  | "DRIVER"

export type UserFields = BaseDataFields & {
  first_name: string
  last_name: string
  email: string | null
  avatar: string | null
  gender: 1 | 2 | 3
  birthday: string
  phone: string
  admin: {
    xid: string
    role: USER_ROLE
  }
}

export type LoginType = "phone" | "email"

export type SignInResponse = {
  data: UserFields
  access_token: string
  refresh_token: string
}
