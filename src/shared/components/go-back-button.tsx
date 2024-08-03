import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

export default function GoBackButton({ path }: { path: string }) {
  const { t: commonT } = useTranslation("common")
  const navigate = useNavigate()
  const goBack = () => navigate(path, { replace: true })
  return (
    <Button size="sm" variant="ghost" onClick={goBack}>
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      {commonT("button.goback")}
    </Button>
  )
}
