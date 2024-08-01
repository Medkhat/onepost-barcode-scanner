import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { getAreas } from "@/shared/api/requests"
import i18n from "@/shared/i18n/i18n.config"
import { convertAreas } from "@/shared/lib/utils"
import { LabelValue, Locale } from "@/shared/types/common.types"

export const useAreas = () => {
  const { data: areasData } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAreas(),
    staleTime: 1000 * 60 * 60 * 24,
  })

  const formattedAreas = useMemo(
    (): LabelValue[] =>
      convertAreas(areasData, i18n.language as Locale) as LabelValue[],
    [areasData]
  )

  return formattedAreas
}
