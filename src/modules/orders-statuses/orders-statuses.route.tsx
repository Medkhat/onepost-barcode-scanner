import { useTranslation } from "react-i18next"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"

import { getOrdersStatuses } from "@/modules/orders-statuses/api/orders-statuses-requests"
import ChangeStatusModal from "@/modules/orders-statuses/components/change-status-modal"
import FilterByOrganizations from "@/modules/orders-statuses/components/filter-by-organizations"
import { ordersStatusesColumns } from "@/modules/orders-statuses/components/orders-statuses-columns"
import { useOrdersStatusesTableFilters } from "@/modules/orders-statuses/hooks/use-orders-statuses-table-filters"
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
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { getPageCount } from "@/shared/lib/utils"

export default function OrdersStatusesRoute() {
  useAuthChecker()
  const { t: ordersT } = useTranslation("orders")

  const { queryParams } = useQueryParams()
  const filters = useOrdersStatusesTableFilters()

  const { data: statusesData, isLoading } = useQuery({
    queryKey: ["statuses", JSON.stringify(queryParams)],
    queryFn: () => getOrdersStatuses(queryParams),
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
            pageCount={getPageCount(statusesData?.count, queryParams.pSize)}
            inputPlaceholder={ordersT("searchPh")}
            filters={filters}
          >
            <FilterByOrganizations />
          </DataTable>
          <DialogContent className="max-h-[calc(100svh-24px)] overflow-y-auto">
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
