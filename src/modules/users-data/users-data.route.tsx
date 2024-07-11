import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"

import { getUsersData } from "@/modules/users-data/api/users-data-requests"
import ChangeUserStatusModal from "@/modules/users-data/components/change-user-status-modal"
import { usersDataColumns } from "@/modules/users-data/components/users-data-columns"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrdersStatusesRoute() {
  const { t: usersDataT } = useTranslation("usersData")

  const {
    queryParams: { page, pSize },
  } = useQueryParams()

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["usersData" + page + pSize],
    queryFn: () => getUsersData({ page, pSize }),
  })

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <PageTitle
          title={usersDataT("title")}
          subtitle={usersDataT("subtitle")}
        />
        <Dialog>
          <DataTable
            data={usersData?.results}
            columns={usersDataColumns}
            isLoading={isLoading}
            pageCount={getPageCount(usersData?.count, pSize)}
          />
          <DialogContent className="max-h-[calc(100svh-24px)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{usersDataT("changeStatus")}</DialogTitle>
              <DialogDescription>
                {usersDataT("changeStatusText")}
              </DialogDescription>
              <ChangeUserStatusModal />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  )
}
