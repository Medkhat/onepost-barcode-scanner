import { LayoutDashboardIcon, ListChecksIcon } from "lucide-react"

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

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: RouteNames.ROOT,
    icon: <LayoutDashboardIcon size={iconSizes.xs} />,
  },
  {
    title: "Organizations",
    label: "3",
    href: RouteNames.ORGANIZATIONS,
    icon: <ListChecksIcon size={iconSizes.xs} />,
  },
]
