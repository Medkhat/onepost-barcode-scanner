import {
  CreateOrgPayload,
  GetOrgOwnersResponse,
  OrganizationItem,
  OrganizationListResponse,
} from "@/modules/organizations/api/organizations.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const getOrgOwners = async () => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<GetOrgOwnersResponse>(
      "/organization-owner/"
    )
  ).data
}

export const createOrg = async (data: CreateOrgPayload) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).post<OrganizationItem>(
      "/receiving-organization/",
      data
    )
  ).data
}

export const getOrgs = async ({ page, pSize }: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(
      BaseApiPaths.USER
    ).get<OrganizationListResponse>("/receiving-organization/", {
      params: { page, pSize },
    })
  ).data
}