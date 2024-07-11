import {
  ChangeUserStatusPayload,
  UsersData,
  UsersDataResponse,
} from "@/modules/users-data/api/users-data.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getUsersData = async ({ page, pSize }: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.IDENTITY).get<UsersDataResponse>(
      "/identity-verifications/",
      {
        params: { page, pSize },
      }
    )
  ).data
}

export const changeUserStatus = async (
  userId: string,
  payload: ChangeUserStatusPayload
) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.IDENTITY).put<UsersData>(
      `/identity-verifications/${userId}/`,
      payload
    )
  ).data
}
