import { useQuery } from "@tanstack/react-query"

import { getOrgs } from "@/modules/organizations/api/orgs-requests"
import { useQueryParams } from "@/shared/hooks/use-query-params"

export const useOrganizationsQuery = () => {
  const { queryParams } = useQueryParams()
  const newQueryParams = { ...queryParams }
  delete newQueryParams.autocomplete

  return useQuery({
    queryKey: ["orgs", JSON.stringify(newQueryParams)],
    queryFn: () => getOrgs(newQueryParams),
  })
}
