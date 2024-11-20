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
      .min(12, organizationsT("formValidation.stationTel"))
      .max(12, organizationsT("formValidation.stationTel")),
    station_owner: z
      .string()
      .uuid(organizationsT("formValidation.stationOwner")),
    station_type: z.enum(
      ["other", "station", "warehouse", "office", "market"],
      {
        message: organizationsT("formValidation.stationType"),
      }
    ),
    station_area: z.string().uuid(organizationsT("formValidation.stationArea")),
    address_kk: z.string().min(1, organizationsT("formValidation.addressKz")),
    address_en: z.string().min(1, organizationsT("formValidation.addressEn")),
    address_ru: z.string().min(1, organizationsT("formValidation.addressRu")),
    latitude: z.string().min(1, organizationsT("formValidation.latitude")),
    longitude: z.string().min(1, organizationsT("formValidation.longitude")),
    is_active: z.boolean(),
  })
}
