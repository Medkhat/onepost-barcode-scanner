import {
  CreateStaffPayload,
  StaffItem,
  StaffResponse,
} from "@/modules/staff/api/staff.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getStaff = async ({ page, pSize }: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<StaffResponse>(
      "/staff/",
      {
        params: { page, pSize },
      }
    )
  ).data
}

export const createStaff = (paylaod: CreateStaffPayload) => {
  return axiosInstanceWithToken(BaseApiPaths.USER).post<StaffItem>(
    "/staff/",
    paylaod
  )
}
