import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"

import { getOrgs } from "@/modules/organizations/api/requests"
import OrganizationFormSheet from "@/modules/organizations/components/form/form-sheet"
import { columns } from "@/modules/organizations/components/table/columns"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrganizationsRoute() {
  useAuthChecker()
  const { t: organizationsT } = useTranslation("organizations")
  const {
    queryParams: { page, pSize },
  } = useQueryParams()

  const { data: orgsData } = useQuery({
    queryKey: ["orgs" + page + pSize],
    queryFn: () => getOrgs({ page, pSize }),
  })

  return (
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
          columns={columns}
          pageCount={getPageCount(orgsData?.count, pSize)}
        />
      </Layout.Body>
    </Layout>
  )
}
