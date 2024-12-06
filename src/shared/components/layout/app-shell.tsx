import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import UserNav from "@/shared/components/layout/user-nav"
import { useTranslation } from "react-i18next"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import Logo from "@/shared/components/logo"
import { cn } from "@/shared/lib/utils"
import useCheckActiveNav from "@/shared/hooks/use-active-nav"

export default function AppShell() {
  useAuthChecker()
  const { t: commonT } = useTranslation("common")

  const { checkActiveNav } = useCheckActiveNav()

  return (
    <Fragment>
      <header className="py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Logo className="w-36" />
          <nav className="flex-1 flex items-center mx-6">
            <Link
              to="/"
              className={cn(
                "py-1 px-3 bg-transparent rounded font-normal",
                checkActiveNav("/") && "bg-primary text-black"
              )}
            >
              {commonT("nav.barcodes")}
            </Link>
          </nav>
          <UserNav />
        </div>
      </header>
      <main
        id="content"
        className={`h-full max-w-5xl mx-auto overflow-x-hidden pt-16 md:overflow-y-hidden md:pt-0`}
      >
        <Outlet />
      </main>
    </Fragment>
  )
}
