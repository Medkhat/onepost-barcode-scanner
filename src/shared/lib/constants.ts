import { LabelValue, Locale } from "@/shared/types/common.types"

export enum RouteNames {
  ROOT = "/",
  ORGANIZATIONS = "/organizations",
  ORDERS_STATUSES = "/orders-statuses",
  LOGIN = "/login",
}

export enum StorageKeys {
  LANGUAGE = "language",
  TOKEN = "UDA_ACCESS_TOKEN",
  USER_DATA = "UDA_USER_DATA",
  SIDEBAR_COLLAPSED = "sidebar_collapsed",
}

export const locales: Record<Locale, string> = {
  kk: "Қазақша",
  ru: "Русский",
}

export const iconSizes = {
  xs: 18,
  sm: 20,
  md: 24,
  lg: 32,
}

export const currencies: LabelValue[] = [
  {
    label: "KZT",
    value: "KZT",
  },
  {
    label: "USD",
    value: "USD",
  },
  {
    label: "EUR",
    value: "EUR",
  },
]

export const DEFAULT_PAGE_SIZE = 10
export const TABLE_SKELETONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
