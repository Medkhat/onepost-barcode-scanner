import { useTranslation } from "react-i18next"
import { PlusCircleIcon } from "lucide-react"

import OrgOwnerForm from "@/modules/org-owners/components/org-owner-form"
import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"

export default function OrgOwnerFormSheet() {
  const { t: orgOwnersT } = useTranslation("orgOwners")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <PlusCircleIcon className="mr-1" />
          {orgOwnersT("create")}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 w-3/4">
        <SheetHeader className="p-6 pb-0 mb-3">
          <SheetTitle className="line-clamp-1">
            {orgOwnersT("enterData")}
          </SheetTitle>
          <SheetDescription className="line-clamp-2">
            {orgOwnersT("formInstruction")}
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 pt-0 max-h-[calc(100svh-112px)] overflow-auto">
          <OrgOwnerForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
