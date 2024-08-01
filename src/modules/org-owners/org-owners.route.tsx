import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"

import { getOrgOwners } from "@/modules/org-owners/api/org-owners-requests"
import OrgOwnerFormSheet from "@/modules/org-owners/components/org-owner-form-sheet"
import { orgOwnersColumns } from "@/modules/org-owners/components/org-owners-columns"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrgOwnersRoute() {
  useAuthChecker()
  const { t: orgOwnersT } = useTranslation("orgOwners")

  const {
    queryParams: { page, pSize, search },
  } = useQueryParams()

  const { data: orgOwnersData, isLoading } = useQuery({
    queryKey: ["orgOwners", page, pSize, search],
    queryFn: () => getOrgOwners({ page, pSize, search }),
  })

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <div className="space-y-2 sm:space-y-0 sm:flex items-start justify-between">
          <PageTitle
            title={orgOwnersT("title")}
            subtitle={orgOwnersT("subTitle")}
          />
          <OrgOwnerFormSheet />
        </div>
        <DataTable
          data={orgOwnersData?.results}
          columns={orgOwnersColumns}
          isLoading={isLoading}
          pageCount={getPageCount(orgOwnersData?.count, pSize)}
          inputPlaceholder={orgOwnersT("searchPh")}
        />
      </Layout.Body>
    </Layout>
  )
}
