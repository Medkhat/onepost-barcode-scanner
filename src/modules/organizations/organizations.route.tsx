import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"

import { getOrgs } from "@/modules/organizations/api/orgs-requests"
import OrganizationFormSheet from "@/modules/organizations/components/form-sheet"
import { organizationsColumns } from "@/modules/organizations/components/organizations-columns"
import { useOrgTableFilters } from "@/modules/organizations/components/table-filters"
import WorkingHoursSheet from "@/modules/organizations/components/work-hours"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"
import { LabelValue } from "@/shared/types/common.types"

export default function OrganizationsRoute() {
  useAuthChecker()
  const { t: organizationsT } = useTranslation("organizations")

  const tableFilters: LabelValue[] = useOrgTableFilters()

  const { queryParams } = useQueryParams()

  const { data: orgsData, isLoading } = useQuery({
    queryKey: ["orgs", JSON.stringify(queryParams)],
    queryFn: () => getOrgs(queryParams),
  })

  return (
    <Fragment>
      <Layout>
        <GeneralHeader />
        <Layout.Body>
          <div className="space-y-2 sm:space-y-0 sm:flex items-start justify-between">
            <PageTitle
              title={organizationsT("welcome")}
              subtitle={organizationsT("welcomeText")}
            />
            <OrganizationFormSheet />
          </div>
          <DataTable
            data={orgsData?.results}
            columns={organizationsColumns}
            pageCount={getPageCount(orgsData?.count, queryParams.pSize)}
            isLoading={isLoading}
            inputPlaceholder={organizationsT("searchPh")}
            filters={tableFilters}
          />
        </Layout.Body>
      </Layout>
      <WorkingHoursSheet />
    </Fragment>
  )
}
