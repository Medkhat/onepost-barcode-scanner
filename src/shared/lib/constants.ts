import { Locale } from "@/shared/types/common.types"

export enum RouteNames {
  ROOT = "/",
  LOGIN = "/login",
}

export enum StorageKeys {
  LANGUAGE = "language",
}

export const locales: Record<Locale, string> = {
  kk: "Қазақша",
  ru: "Русский",
}