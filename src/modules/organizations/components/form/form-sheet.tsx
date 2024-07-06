import { useTranslation } from "react-i18next"
import { PlusCircleIcon } from "lucide-react"

import OrganizationForm from "@/modules/organizations/components/form/organization-form"
import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"

export default function OrganizationFormSheet() {
  const { t: organizationsT } = useTranslation("organizations")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <PlusCircleIcon className="mr-1" />
          {organizationsT("create")}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-6 pb-0 mb-3">
          <SheetTitle className="line-clamp-1">
            {organizationsT("enterData")}
          </SheetTitle>
          <SheetDescription className="line-clamp-2">
            {organizationsT("formInstruction")}
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 pt-0 max-h-[calc(100svh-112px)] overflow-auto">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
