import { useMemo } from "react"
import { useTranslation } from "react-i18next"

export const useWeekdayLabels = () => {
  const { t: commonT } = useTranslation("common")
  const labels = useMemo(
    () => ({
      1: commonT("weekdays.monday"),
      2: commonT("weekdays.tuesday"),
      3: commonT("weekdays.wednesday"),
      4: commonT("weekdays.thursday"),
      5: commonT("weekdays.friday"),
      6: commonT("weekdays.saturday"),
      7: commonT("weekdays.sunday"),
    }),
    [commonT]
  )

  return labels
}
