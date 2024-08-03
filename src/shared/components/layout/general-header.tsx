import LanguageSwitcher from "@/shared/components/language-switcher"
import { Layout } from "@/shared/components/layout/main.layout"
import UserNav from "@/shared/components/layout/user-nav"
import ThemeSwitcher from "@/shared/components/theme/theme-switcher"

export default function GeneralHeader() {
  return (
    <Layout.Header>
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="text-muted-foreground p-3 rounded-xl border border-border">
          Here we can add something
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <UserNav />
        </div>
      </div>
    </Layout.Header>
  )
}
