import { useTranslation } from "react-i18next"

import { UserAuthForm } from "@/modules/auth/components/auth-form"
import LanguageSwitcher from "@/shared/components/language-switcher"
import Logo from "@/shared/components/logo"
import ThemeSwitcher from "@/shared/components/theme/theme-switcher"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { useVhVar } from "@/shared/hooks/use-vh-var"

export default function AuthenticationPage() {
  useAuthChecker()
  useVhVar()
  const { t: authT } = useTranslation("auth")

  return (
    <div className="container relative fixed-h-screen flex-col items-stretch justify-center md:grid md:grid-cols-2 px-0 lg:max-w-none">
      <div className="relative h-1/3 md:h-full flex flex-col items-center sm:items-start bg-muted p-10 text-white dark:border-r bg-[url('/images/supply-chain.jpeg')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black/65" />
        <Logo className="z-10" />
        <div className="relative z-20 mt-auto text-center sm:text-left">
          <blockquote className="space-y-2">
            <p className="text-base sm:text-lg">
              &ldquo;UDA Express is the great delivery company. We love
              it:)&rdquo;
            </p>
            <footer className="text-sm">Baktiyar Aydar</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="sm:flex-1 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-3 py-8 md:p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {authT("loginTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {authT("loginSubtitle")}
            </p>
          </div>
          <UserAuthForm />
        </div>

        <div className="mb-2 flex items-center justify-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
