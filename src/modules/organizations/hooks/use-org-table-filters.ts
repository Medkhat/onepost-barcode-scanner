import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { STATION_TYPE_VALUE } from "@/modules/organizations/api/organizations.types"
import { useAreas } from "@/shared/hooks/use-areas"
import { LabelValue } from "@/shared/types/common.types"

export const useOrgTableFilters = () => {
  const { t: organizationsT } = useTranslation("organizations")
  const areas = useAreas()
  const tableFilters: LabelValue[] = useMemo(
    () => [
      {
        label: organizationsT("formLabel.stationType"),
        value: "station_type",
        subOptions: [
          {
            label: organizationsT("orgType.other"),
            value: STATION_TYPE_VALUE.other.toString(),
          },
          {
            label: organizationsT("orgType.station"),
            value: STATION_TYPE_VALUE.station.toString(),
          },
          {
            label: organizationsT("orgType.warehouse"),
            value: STATION_TYPE_VALUE.warehouse.toString(),
          },
          {
            label: organizationsT("orgType.office"),
            value: STATION_TYPE_VALUE.office.toString(),
          },
          {
            label: organizationsT("orgType.market"),
            value: STATION_TYPE_VALUE.market.toString(),
          },
        ],
      },
      {
        label: organizationsT("formLabel.stationArea"),
        value: "station_region",
        subOptions: areas,
      },
    ],
    [areas, organizationsT]
  )
  return tableFilters
}
