import { useTranslation } from "react-i18next"

import WorkingHoursForm from "@/modules/organizations/components/working-hours-form"
import { useOrganizationsStore } from "@/modules/organizations/store/organizations.store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"

export default function WorkingHoursSheet() {
  const isOpen = useOrganizationsStore((state) => state.workingHoursModal)
  const { t: organizationsT } = useTranslation("organizations")

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      useOrganizationsStore.setState({ workingHoursModal: false })
    }
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{organizationsT("workingHours")}</DialogTitle>
          <DialogDescription>
            {organizationsT("workingHoursText")}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(100svh-24px)] overflow-auto">
          <WorkingHoursForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
