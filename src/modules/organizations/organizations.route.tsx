import LanguageSwitcher from "@/shared/components/language-switcher"
import { Layout } from "@/shared/components/layout/main.layout"
import ThemeSwitcher from "@/shared/components/theme/theme-switcher"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"

export default function Organizations() {
  useAuthChecker()
  return (
    <Layout>
      <Layout.Header>
        <h1>Organizations</h1>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
        </div>
      </Layout.Body>
    </Layout>
  )
}
