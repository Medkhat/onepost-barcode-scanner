import { LabelValue, Locale } from "@/shared/types/common.types"

export enum RouteNames {
  ROOT = "/",
  ORGANIZATIONS = "/organizations",
  ORGANIZATION_DETAIL = "/organizations/:id",
  ORG_OWNERS = "/owners",
  ORDERS_STATUSES = "/orders-statuses",
  USERS_DATA = "/users-data",
  STAFF = "/staff",
  LOGIN = "/login",
}

export enum StorageKeys {
  LANGUAGE = "language",
  TOKEN = "OP_ACCESS_TOKEN",
  USER_DATA = "OP_USER_DATA",
  SIDEBAR_COLLAPSED = "sidebar_collapsed",
}

export const locales: Record<Locale, string> = {
  kk: "Қазақша",
  ru: "Русский",
  en: "English",
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
