import { create } from "zustand"

import { OrganizationListItem } from "@/modules/organizations/api/organizations.types"

type OrgainzationsStore = {
  workingHoursModal: boolean
  organizationId: string | null
  formModal: boolean
  organization: OrganizationListItem | null
}

export const useOrganizationsStore = create<OrgainzationsStore>(() => ({
  workingHoursModal: false,
  organizationId: null,
  formModal: false,
  organization: null,
}))
