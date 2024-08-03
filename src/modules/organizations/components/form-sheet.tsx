import { useTranslation } from "react-i18next"

import OrganizationForm from "@/modules/organizations/components/organization-form"
import { useOrganizationsStore } from "@/modules/organizations/store/organizations.store"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet"

export default function OrganizationFormSheet() {
  const { t: organizationsT } = useTranslation("organizations")
  const isOpen = useOrganizationsStore((state) => state.formModal)
  const isEditMode = useOrganizationsStore((state) =>
    Boolean(state.organization)
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      useOrganizationsStore.setState({ formModal: false, organization: null })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="p-0 w-3/4">
        <SheetHeader className="p-6 pb-0 mb-3">
          <SheetTitle className="line-clamp-1">
            {isEditMode
              ? organizationsT("changeData")
              : organizationsT("enterData")}
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
