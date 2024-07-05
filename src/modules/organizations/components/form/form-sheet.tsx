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
      <SheetContent>
        <SheetHeader className="mb-3">
          <SheetTitle>{organizationsT("enterData")}</SheetTitle>
          <SheetDescription>
            {organizationsT("formInstruction")}
          </SheetDescription>
        </SheetHeader>
        <OrganizationForm />
      </SheetContent>
    </Sheet>
  )
}
