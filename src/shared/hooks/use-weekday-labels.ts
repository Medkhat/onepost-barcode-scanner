import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { WeekDay } from "@/modules/organizations/api/organizations.types"

export const useWeekdayLabels = () => {
  const { t: commonT } = useTranslation("common")
  const labels = useMemo(
    (): Record<WeekDay, string> => ({
      MO: commonT("weekdays.monday"),
      TU: commonT("weekdays.tuesday"),
      WE: commonT("weekdays.wednesday"),
      TH: commonT("weekdays.thursday"),
      FR: commonT("weekdays.friday"),
      SA: commonT("weekdays.saturday"),
      SU: commonT("weekdays.sunday"),
    }),
    [commonT]
  )

  return labels
}
