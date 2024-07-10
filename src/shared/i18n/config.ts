import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import kkAuth from "@/modules/auth/i18n/kk.json"
import ruAuth from "@/modules/auth/i18n/ru.json"
import kkOrders from "@/modules/orders/i18n/kk.json"
import ruOrders from "@/modules/orders/i18n/ru.json"
import kkOrgs from "@/modules/organizations/i18n/kk.json"
import ruOrgs from "@/modules/organizations/i18n/ru.json"
import kkCommon from "@/shared/i18n/kk/common.json"
import ruCommon from "@/shared/i18n/ru/common.json"
import { StorageKeys } from "@/shared/lib/constants"

i18n.use(initReactI18next).init<{
  kk: {
    common: typeof kkCommon
    auth: typeof kkAuth
    organizations: typeof kkOrgs
    orders: typeof kkOrders
  }
  ru: {
    common: typeof ruCommon
    auth: typeof ruAuth
    organizations: typeof ruOrgs
    orders: typeof ruOrders
  }
}>({
  resources: {
    kk: {
      common: kkCommon,
      auth: kkAuth,
      organizations: kkOrgs,
      orders: kkOrders,
    },
    ru: {
      common: ruCommon,
      auth: ruAuth,
      organizations: ruOrgs,
      orders: ruOrders,
    },
  },
  lng: localStorage.getItem(StorageKeys.LANGUAGE) || "kk",
  fallbackLng: "kk",
  debug: process.env.NODE_ENV === "development",
  supportedLngs: ["kk", "ru"],
  compatibilityJSON: "v4",
  defaultNS: "common",
  ns: ["common", "auth", "organizations", "orders"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
