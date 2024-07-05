import { useTranslation } from "react-i18next"
import { z } from "zod"

export const useOrgFormSchema = () => {
  const { t: organizationsT } = useTranslation("organizations")

  return z.object({
    station_name: z
      .string()
      .min(1, organizationsT("formValidation.stationName")),
    extra_station_name: z.string().optional(),
    station_code: z
      .string()
      .min(1, organizationsT("formValidation.stationCode")),
    extra_code: z.string().optional(),
    station_tel: z
      .string()
      .regex(/^\d{10}$/, organizationsT("formValidation.stationTel")),
    station_owner: z
      .string()
      .uuid(organizationsT("formValidation.stationOwner")),
    station_area: z.string().uuid(organizationsT("formValidation.stationArea")),
    station_price: z
      .number()
      .positive(organizationsT("formValidation.stationPrice")),
    price_currency: z.enum(["USD", "EUR", "KZT"], {
      message: organizationsT("formValidation.priceCurrency"),
    }),
    address_kz: z.string().min(1, organizationsT("formValidation.addressKz")),
    address_en: z.string().min(1, organizationsT("formValidation.addressEn")),
    address_ru: z.string().min(1, organizationsT("formValidation.addressRu")),
    latitude: z.number().refine((value) => value !== undefined, {
      message: organizationsT("formValidation.latitude"),
    }),
    longitude: z.number().refine((value) => value !== undefined, {
      message: organizationsT("formValidation.longitude"),
    }),
  })
}

export type OrgFormValues = z.infer<ReturnType<typeof useOrgFormSchema>>
