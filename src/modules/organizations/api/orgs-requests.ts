import {
  CreateOrgPayload,
  OrganizationItem,
  OrganizationListResponse,
  OrgWorkingHours,
} from "@/modules/organizations/api/organizations.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

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

export const getOrgDetail = async (orgId: string) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<OrganizationItem>(
      `/receiving-organization/${orgId}/`
    )
  ).data
}

export const setWorkingHours = async (payload: OrgWorkingHours) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).post<void>(
      "/organization-work-time/",
      payload
    )
  ).data
}
