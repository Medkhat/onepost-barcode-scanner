import { Locale } from "@/shared/lib/common.types"

export enum RouteNames {
  ROOT = "/",
  ORGANIZATIONS = "/organizations",
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
