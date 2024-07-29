import { create } from "zustand"

type OrgainzationsStore = {
  workingHoursModal: boolean
  organizationId: string | null
}

export const useOrganizationsStore = create<OrgainzationsStore>(() => ({
  workingHoursModal: false,
  organizationId: null,
}))
