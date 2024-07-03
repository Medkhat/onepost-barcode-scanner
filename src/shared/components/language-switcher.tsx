import { useTranslation } from "react-i18next"

import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { locales, StorageKeys } from "@/shared/lib/constants"
import { Locale } from "@/shared/types/common.types"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language: Locale) => {
    i18n.changeLanguage(language)
    localStorage.setItem(StorageKeys.LANGUAGE, language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{locales[i18n.language as Locale]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {Object.keys(locales).map((item) => (
          <DropdownMenuItem
            key={item}
            onClick={() => handleLanguageChange(item as Locale)}
          >
            {locales[item as Locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
