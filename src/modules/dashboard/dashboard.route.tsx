import { useTranslation } from "react-i18next"
import {
  BuildingIcon,
  DownloadIcon,
  PackageIcon,
  WeightIcon,
} from "lucide-react"

import { OverviewChart } from "@/modules/dashboard/components/overview-chart"
import RecentSales from "@/modules/dashboard/components/recent-sales"
import { useOrganizationsQuery } from "@/modules/organizations/hooks/use-queries"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"

export default function Dashboard() {
  useAuthChecker()
  const { t: commonT } = useTranslation("common")
  const { t: dashboardT } = useTranslation("dashboard")

  const { data: orgsData } = useOrganizationsQuery()

  return (
    <Layout>
      <GeneralHeader />
      <Layout.Body>
        <Layout.Body>
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Аналитика</h1>
            <Button>
              {commonT("button.download")}
              <DownloadIcon className="ml-2" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {dashboardT("totalOrganization")}
                  </CardTitle>
                  <BuildingIcon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orgsData?.count}</div>
                  <p className="text-xs text-muted-foreground">
                    +10.1% {dashboardT("fromLastMonth")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {dashboardT("totalOrders")}
                  </CardTitle>
                  <PackageIcon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% {dashboardT("fromLastMonth")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {dashboardT("todayOrders")}
                  </CardTitle>
                  <PackageIcon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+0</div>
                  <p className="text-xs text-muted-foreground">
                    +0% {dashboardT("fromLastMonth")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {dashboardT("todayOrdersWeight")}
                  </CardTitle>
                  <WeightIcon className="w-5 h-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+0</div>
                  <p className="text-xs text-muted-foreground">
                    +0 {dashboardT("fromLastMonth")}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <OverviewChart />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>{dashboardT("topOrganizations")}</CardTitle>
                  <CardDescription>
                    {dashboardT("topOrganizationsDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </div>
        </Layout.Body>
      </Layout.Body>
    </Layout>
  )
}
