import { useTranslation } from "react-i18next"
import {
  BookUserIcon,
  BringToFrontIcon,
  Building2Icon,
  LayoutDashboardIcon,
  UserRoundSearchIcon,
} from "lucide-react"

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
      label: "",
      href: RouteNames.ORGANIZATIONS,
      icon: <Building2Icon size={iconSizes.xs} />,
    },
    {
      title: commonT("nav.ordersStatuses"),
      label: "",
      href: RouteNames.ORDERS_STATUSES,
      icon: <BringToFrontIcon size={iconSizes.xs} />,
    },
    {
      title: commonT("nav.usersData"),
      label: "",
      href: RouteNames.USERS_DATA,
      icon: <BookUserIcon size={iconSizes.xs} />,
    },
    {
      title: commonT("nav.staff"),
      label: "",
      href: RouteNames.STAFF,
      icon: <UserRoundSearchIcon size={iconSizes.xs} />,
    },
  ]
}
