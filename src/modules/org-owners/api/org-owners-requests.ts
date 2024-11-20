import {
  GetOrgOwnersResponse,
  OrgOwner,
  OrgOwnerPayload,
} from "@/modules/org-owners/api/org-owners.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getOrgOwners = async ({
  pSize,
  page,
  search,
}: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<GetOrgOwnersResponse>(
      "/station-owners/",
      {
        params: {
          page,
          pSize,
          search,
        },
      }
    )
  ).data
}

export const createOrgOwner = (paylaod: OrgOwnerPayload) => {
  return axiosInstanceWithToken(BaseApiPaths.USER).post<OrgOwner>(
    "/station-owners/",
    paylaod
  )
}
