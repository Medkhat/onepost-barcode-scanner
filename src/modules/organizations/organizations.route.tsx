import { useQuery } from "@tanstack/react-query"

import { getOrgs } from "@/modules/organizations/api/requests"
import OrganizationFormSheet from "@/modules/organizations/components/form/form-sheet"
import { columns } from "@/modules/organizations/components/table/columns"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"

export default function Organizations() {
  useAuthChecker()

  const { data: orgsData } = useQuery({
    queryKey: ["orgs"],
    queryFn: getOrgs,
  })

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <div className="space-y-2 sm:space-y-0 sm:flex items-start justify-between">
          <PageTitle
            title="Welcome to organizations!"
            subtitle="You can see the list, add or update:)"
          />
          <OrganizationFormSheet />
        </div>
        <DataTable data={orgsData?.results} columns={columns} />
      </Layout.Body>
    </Layout>
  )
}
