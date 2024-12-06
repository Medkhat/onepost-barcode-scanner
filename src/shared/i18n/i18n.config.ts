import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import kkAuth from "@/modules/auth/i18n/auth-kk.json"
import ruAuth from "@/modules/auth/i18n/auth-ru.json"
import kkCommon from "@/shared/i18n/kk/common.json"
import ruCommon from "@/shared/i18n/ru/common.json"
import { StorageKeys } from "@/shared/lib/constants"

i18n.use(initReactI18next).init({
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
  supportedLngs: ["kk", "ru", "en"],
  compatibilityJSON: "v4",
  defaultNS: "common",
  ns: ["common", "auth"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
