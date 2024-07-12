import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"

import { getStaff } from "@/modules/staff/api/staff-requests"
import { staffColumns } from "@/modules/staff/components/staff-columns"
import StaffFormSheet from "@/modules/staff/components/staff-form-sheet"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrdersStatusesRoute() {
  useAuthChecker()
  const { t: staffT } = useTranslation("staff")

  const {
    queryParams: { page, pSize },
  } = useQueryParams()

  const { data: staffData, isLoading } = useQuery({
    queryKey: ["staff" + page + pSize],
    queryFn: () => getStaff({ page, pSize }),
  })

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <div className="space-y-2 sm:space-y-0 sm:flex items-start justify-between">
          <PageTitle title={staffT("title")} subtitle={staffT("subTitle")} />
          <StaffFormSheet />
        </div>
        <DataTable
          data={staffData?.results}
          columns={staffColumns}
          isLoading={isLoading}
          pageCount={getPageCount(staffData?.count, pSize)}
        />
      </Layout.Body>
    </Layout>
  )
}
