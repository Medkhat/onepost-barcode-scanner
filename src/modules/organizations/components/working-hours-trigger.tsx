import { CalendarCheckIcon } from "lucide-react"

import { useOrganizationsStore } from "@/modules/organizations/store/organizations.store"
import { Button } from "@/shared/components/ui/button"

export default function WorkingHoursTrigger({ orgId }: { orgId: string }) {
  const handleOpenWorkingHours = () => {
    useOrganizationsStore.setState({
      workingHoursModal: true,
      organizationId: orgId,
    })
  }
  return (
    <Button variant="outline" size="icon" onClick={handleOpenWorkingHours}>
      <CalendarCheckIcon />
    </Button>
  )
}
