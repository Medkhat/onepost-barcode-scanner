import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"

export default function Dashboard() {
  useAuthChecker()
  return (
    <Layout>
      <GeneralHeader />

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
      </Layout.Body>
    </Layout>
  )
}
