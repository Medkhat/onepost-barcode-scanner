import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { useOrderStatusLabels } from "@/modules/orders-statuses/hooks/use-orders-statuses-constants"
import { LabelValue } from "@/shared/types/common.types"

export const useOrdersStatusesTableFilters = () => {
  const { t: ordersT } = useTranslation("common")
  const orderStatusLabels = useOrderStatusLabels()
  const tableFilters: LabelValue[] = useMemo(
    () => [
      {
        label: ordersT("tableHeaderTitles.status"),
        value: "status_type",
        subOptions: Object.entries(orderStatusLabels).map(([key, value]) => ({
          label: value,
          value: key,
        })),
      },
      {
        label: ordersT("tableHeaderTitles.company"),
        value: "market_company",
        subOptions: [
          { label: "PINDODO", value: "PINDODO" },
          { label: "TEMU", value: "TEMU" },
        ],
      },
      {
        label: ordersT("tableHeaderTitles.payment"),
        value: "is_payed",
        subOptions: [
          { label: ordersT("tableHeaderTitles.payed"), value: "true" },
          { label: ordersT("tableHeaderTitles.notPayed"), value: "false" },
        ],
      },
    ],
    [orderStatusLabels, ordersT]
  )
  return tableFilters
}
