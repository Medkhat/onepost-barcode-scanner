import { create } from "zustand"

import { OrganizationItem } from "@/modules/organizations/api/organizations.types"

type OrgainzationsStore = {
  workingHoursModal: boolean
  organizationId: string | null
  formModal: boolean
  organization: OrganizationItem | null
}

export const useOrganizationsStore = create<OrgainzationsStore>(() => ({
  workingHoursModal: false,
  organizationId: null,
  formModal: false,
  organization: null,
}))
