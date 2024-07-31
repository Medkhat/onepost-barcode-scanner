import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const STATION_TYPE = {
  1: "other",
  2: "station",
  3: "warehouse",
  4: "office",
  5: "market",
}

export const useStationTypeLabel = ({
  type,
}: {
  type: keyof typeof STATION_TYPE
}) => {
  const { t: organizationT } = useTranslation("organizations")
  const stattionType = useMemo(
    () => ({
      1: organizationT("orgType.other"),
      2: organizationT("orgType.station"),
      3: organizationT("orgType.warehouse"),
      4: organizationT("orgType.office"),
      5: organizationT("orgType.market"),
    }),
    [organizationT]
  )
  return stattionType[type]
}
