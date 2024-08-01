import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { STATION_TYPE_VALUE } from "@/modules/organizations/api/organizations.types"

export const useStationTypeLabel = ({
  type,
  returnAll,
}: {
  type?: number
  returnAll?: boolean
}) => {
  const { t: organizationT } = useTranslation("organizations")
  const stationType = useMemo(
    () => ({
      1: organizationT("orgType.other"),
      2: organizationT("orgType.station"),
      3: organizationT("orgType.warehouse"),
      4: organizationT("orgType.office"),
      5: organizationT("orgType.market"),
    }),
    [organizationT]
  )
  const stationStringTypes: Record<keyof typeof STATION_TYPE_VALUE, string> =
    useMemo(
      () => ({
        other: organizationT("orgType.other"),
        station: organizationT("orgType.station"),
        warehouse: organizationT("orgType.warehouse"),
        office: organizationT("orgType.office"),
        market: organizationT("orgType.market"),
      }),
      [organizationT]
    )
  return returnAll
    ? stationStringTypes
    : stationType[type as keyof typeof stationType]
}
