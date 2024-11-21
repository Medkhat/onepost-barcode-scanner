import {
  OrganizationFormFields,
  OrganizationItem,
  OrganizationListResponse,
  OrgWorkingHours,
} from "@/modules/organizations/api/organizations.types"
import { axiosInstanceWithToken, BaseApiPaths } from "@/shared/api/axios-config"
import { BaseQueryParams } from "@/shared/api/types"

export const createOrg = async (data: OrganizationFormFields) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).post<OrganizationItem>(
      "/stations/",
      data
    )
  ).data
}

export const updateOrg = async (
  id: string,
  data: Partial<OrganizationFormFields>
) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).put<OrganizationItem>(
      "/stations/" + id + "/",
      data
    )
  ).data
}

export const getOrgs = async ({
  page,
  pSize,
  search,
  station_region,
  station_type,
}: BaseQueryParams) => {
  return (
    await axiosInstanceWithToken(
      BaseApiPaths.USER
    ).get<OrganizationListResponse>("/stations/", {
      params: { page, pSize, search, station_region, station_type },
    })
  ).data
}

export const getOrgDetail = async (orgId: string) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).get<OrganizationItem>(
      `/stations/${orgId}/`
    )
  ).data
}

export const setWorkingHours = async (payload: OrgWorkingHours) => {
  return (
    await axiosInstanceWithToken(BaseApiPaths.USER).post<void>(
      "/station-time/",
      payload
    )
  ).data
}
