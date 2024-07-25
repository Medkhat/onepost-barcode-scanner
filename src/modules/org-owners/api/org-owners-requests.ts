import {
  GetOrgOwnersResponse,
  OrgOwner,
  OrgOwnerPayload,
} from "@/modules/org-owners/api/org-owners.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getOrgOwners = async ({ pSize, page }: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<GetOrgOwnersResponse>(
      "/organization-owner/",
      {
        params: {
          page,
          pSize,
        },
      }
    )
  ).data
}

export const createOrgOwner = (paylaod: OrgOwnerPayload) => {
  return axiosInstanceWithToken(BaseApiPaths.USER).post<OrgOwner>(
    "/organization-owner/",
    paylaod
  )
}
