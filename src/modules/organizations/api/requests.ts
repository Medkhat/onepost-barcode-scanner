import { GetOrgOwnersResponse } from "@/modules/organizations/api/organizations.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"

export const getOrgOwners = async () => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<GetOrgOwnersResponse>(
      "/organization-owner/"
    )
  ).data
}
