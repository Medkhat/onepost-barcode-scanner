import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import kkAuth from "@/modules/auth/i18n/auth-kk.json"
import ruAuth from "@/modules/auth/i18n/auth-ru.json"
import kkOrders from "@/modules/orders-statuses/i18n/orders-statuses-kk.json"
import ruOrders from "@/modules/orders-statuses/i18n/orders-statuses-ru.json"
import kkOrgOwners from "@/modules/org-owners/i18n/org-owners-kk.json"
import ruOrgOwners from "@/modules/org-owners/i18n/org-owners-ru.json"
import kkOrgs from "@/modules/organizations/i18n/organizations-kk.json"
import ruOrgs from "@/modules/organizations/i18n/organizations-ru.json"
import kkStaff from "@/modules/staff/i18n/staff-kk.json"
import ruStaff from "@/modules/staff/i18n/staff-ru.json"
import kkUsersData from "@/modules/users-data/i18n/users-data-kk.json"
import ruUsersData from "@/modules/users-data/i18n/users-data-ru.json"
import kkCommon from "@/shared/i18n/kk/common.json"
import ruCommon from "@/shared/i18n/ru/common.json"
import { StorageKeys } from "@/shared/lib/constants"

i18n.use(initReactI18next).init({
  resources: {
    kk: {
      common: kkCommon,
      auth: kkAuth,
      organizations: kkOrgs,
      orgOwners: kkOrgOwners,
      orders: kkOrders,
      usersData: kkUsersData,
      staff: kkStaff,
    },
    ru: {
      common: ruCommon,
      auth: ruAuth,
      organizations: ruOrgs,
      orgOwners: ruOrgOwners,
      orders: ruOrders,
      usersData: ruUsersData,
      staff: ruStaff,
    },
  },
  lng: localStorage.getItem(StorageKeys.LANGUAGE) || "kk",
  fallbackLng: "kk",
  debug: process.env.NODE_ENV === "development",
  supportedLngs: ["kk", "ru"],
  compatibilityJSON: "v4",
  defaultNS: "common",
  ns: ["common", "auth", "organizations", "orders", "usersData"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
