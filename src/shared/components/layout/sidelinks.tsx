import { useTranslation } from "react-i18next"
import { Building2Icon, LayoutDashboardIcon } from "lucide-react"

import { iconSizes, RouteNames } from "@/shared/lib/constants"

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const useSidelinks = (): SideLink[] => {
  const { t: commonT } = useTranslation("common")
  return [
    {
      title: commonT("nav.dashboard"),
      label: "",
      href: RouteNames.ROOT,
      icon: <LayoutDashboardIcon size={iconSizes.xs} />,
    },
    {
      title: commonT("nav.organizations"),
      label: "3",
      href: RouteNames.ORGANIZATIONS,
      icon: <Building2Icon size={iconSizes.xs} />,
    },
  ]
}
