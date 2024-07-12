import { useTranslation } from "react-i18next"
import { z } from "zod"

export const useStaffFormSchema = () => {
  const { t: staffT } = useTranslation("staff")

  return z.object({
    first_name: z.string().min(1, staffT("validation.firstName")),
    last_name: z.string().min(1, staffT("validation.lastName")),
    email: z.string().email(staffT("validation.email")),
    phone: z
      .string()
      .min(12, staffT("validation.phone"))
      .max(12, staffT("validation.phone")),
  })
}
