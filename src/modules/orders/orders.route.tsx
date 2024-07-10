import { useTranslation } from "react-i18next"

import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
// import { DataTable } from "@/shared/components/table/data-table"

export default function OrdersRoute() {
  const { t: ordersT } = useTranslation("orders")
  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <PageTitle
          title={ordersT("welcome")}
          subtitle={ordersT("welcomeText")}
        />
        {/* <DataTable data={[]} columns={columns} /> */}
      </Layout.Body>
    </Layout>
  )
}
