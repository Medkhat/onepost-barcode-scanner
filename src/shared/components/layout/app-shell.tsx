import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"
import { Link, Outlet } from "react-router-dom"

import LanguageSwitcher from "@/shared/components/language-switcher"
import UserNav from "@/shared/components/layout/user-nav"
import Logo from "@/shared/components/logo"
import ThemeSwitcher from "@/shared/components/theme/theme-switcher"
import useCheckActiveNav from "@/shared/hooks/use-active-nav"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { cn } from "@/shared/lib/utils"

export default function AppShell() {
  useAuthChecker()
  const { t: commonT } = useTranslation("common")

  const { checkActiveNav } = useCheckActiveNav()

  return (
    <Fragment>
      <header className="py-3">
        <div className="max-w-5xl mx-5 md:mx-auto flex items-center justify-between">
          <Logo className="w-36" />
          <nav className="hidden flex-1 sm:flex items-center mx-6">
            <Link
              to="/"
              className={cn(
                "py-1 px-3 bg-transparent rounded font-normal",
                checkActiveNav("/") && "bg-primary text-background"
              )}
            >
              {commonT("nav.barcodes")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <UserNav />
          </div>
        </div>
      </header>
      <main id="content" className={`h-full max-w-5xl mx-5 md:mx-auto`}>
        <Outlet />
      </main>
    </Fragment>
  )
}
