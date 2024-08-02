import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

export default function GoBackButton() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <Button size="icon" variant="ghost" onClick={goBack}>
      <ArrowLeftIcon className="w-5 h-5" />
    </Button>
  )
}
