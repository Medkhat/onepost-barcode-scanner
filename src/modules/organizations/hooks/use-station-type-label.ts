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
      1: organizationT("stationType.other"),
      2: organizationT("stationType.station"),
      3: organizationT("stationType.warehouse"),
      4: organizationT("stationType.office"),
      5: organizationT("stationType.market"),
    }),
    [organizationT]
  )
  return stattionType[type]
}
