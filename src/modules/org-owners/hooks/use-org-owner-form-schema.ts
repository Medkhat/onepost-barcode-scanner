import { useTranslation } from "react-i18next"
import { z } from "zod"

export const useOrgOwnerFormSchema = () => {
  const { t: orgOwnersT } = useTranslation("orgOwners")

  return z.object({
    first_name: z.string().min(1, orgOwnersT("validation.firstName")),
    last_name: z.string().min(1, orgOwnersT("validation.lastName")),
    email: z.string().email(orgOwnersT("validation.email")),
    phone: z
      .string()
      .min(12, orgOwnersT("validation.phone"))
      .max(12, orgOwnersT("validation.phone")),
  })
}