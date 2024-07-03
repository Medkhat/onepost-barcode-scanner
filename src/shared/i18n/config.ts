import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import kkAuth from "@/shared/i18n/kk/auth.json"
import kkCommon from "@/shared/i18n/kk/common.json"
import ruAuth from "@/shared/i18n/ru/auth.json"
import ruCommon from "@/shared/i18n/ru/common.json"
import { StorageKeys } from "@/shared/lib/constants"

i18n.use(initReactI18next).init<{
  kk: { common: typeof kkCommon; auth: typeof kkAuth }
  ru: { common: typeof ruCommon; auth: typeof ruAuth }
}>({
  resources: {
    kk: {
      common: kkCommon,
      auth: kkAuth,
    },
    ru: {
      common: ruCommon,
      auth: ruAuth,
    },
  },
  lng: localStorage.getItem(StorageKeys.LANGUAGE) || "kk",
  fallbackLng: "kk",
  debug: process.env.NODE_ENV === "development",
  supportedLngs: ["kk", "ru"],
  compatibilityJSON: "v4",
  defaultNS: "common",
  ns: ["common", "auth"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
