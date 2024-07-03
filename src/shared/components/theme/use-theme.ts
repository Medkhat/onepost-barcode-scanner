import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { ThemeProviderContext } from "@/shared/components/theme/provider"
import { ColorMode } from "@/shared/components/theme/theme.types"

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export const useColorModes = (): ColorMode[] => {
  const { t: commonT } = useTranslation("common")
  return [
    {
      label: commonT("theme.light"),
      value: "light",
      Icon: SunIcon,
    },
    {
      label: commonT("theme.dark"),
      value: "dark",
      Icon: MoonIcon,
    },
    {
      label: commonT("theme.system"),
      value: "system",
      Icon: MonitorIcon,
    },
  ]
}
