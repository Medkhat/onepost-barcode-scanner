import { useTranslation } from "react-i18next"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"

import { getOrdersStatuses } from "@/modules/orders-statuses/api/orders-statuses-requests"
import ChangeStatusModal from "@/modules/orders-statuses/components/change-status-modal"
import { ordersStatusesColumns } from "@/modules/orders-statuses/components/table/orders-statuses-columns"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { DataTable } from "@/shared/components/table/data-table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrdersStatusesRoute() {
  const { t: ordersT } = useTranslation("orders")

  const {
    queryParams: { page, pSize },
  } = useQueryParams()

  const { data: statusesData, isLoading } = useQuery({
    queryKey: ["statuses" + page + pSize],
    queryFn: () => getOrdersStatuses({ page, pSize }),
  })

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <PageTitle
          title={ordersT("welcome")}
          subtitle={ordersT("welcomeText")}
        />
        <Dialog>
          <DataTable
            data={statusesData?.results}
            columns={ordersStatusesColumns}
            isLoading={isLoading}
            pageCount={getPageCount(statusesData?.count, pSize)}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{ordersT("changeStatus")}</DialogTitle>
              <DialogDescription>
                {ordersT("changeStatusText")}
              </DialogDescription>
              <ChangeStatusModal />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  )
}
