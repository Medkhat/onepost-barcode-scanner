import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  OrganizationFields,
  OrganizationFormFields,
  OrganizationItem,
  STATION_TYPE_VALUE,
  STATION_VALUE_TYPE,
} from "@/modules/organizations/api/organizations.types"
import { createOrg, updateOrg } from "@/modules/organizations/api/orgs-requests"
import OrganizationFormOwners from "@/modules/organizations/components/organization-form-owners"
import OrganizationFormStationType from "@/modules/organizations/components/organization-form-station-type"
import { useOrgFormSchema } from "@/modules/organizations/hooks/use-form-schema"
import { useOrganizationsStore } from "@/modules/organizations/store/organizations.store"
import FormAutocomplete from "@/shared/components/form/form-autocomplete"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { SheetClose } from "@/shared/components/ui/sheet"
import { Switch } from "@/shared/components/ui/switch"
import { useAreas } from "@/shared/hooks/use-areas"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { Locale } from "@/shared/types/common.types"

export default function OrganizationForm() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const { t: organizationsT, i18n } = useTranslation("organizations")
  const { t: commonT } = useTranslation("common")

  const areas = useAreas()

  const storedOrganization = useOrganizationsStore(
    (state) => state.organization
  )
  const isEditMode = Boolean(storedOrganization)

  const { queryParams } = useQueryParams()
  const newQueryParams = { ...queryParams }
  delete newQueryParams.autocomplete

  const qc = useQueryClient()

  const orgMutation = useMutation<
    OrganizationItem,
    AxiosError,
    OrganizationFormFields
  >({
    mutationFn: isEditMode
      ? (values) => updateOrg(storedOrganization?.id as string, { ...values })
      : createOrg,
    onSuccess: () => {
      toast.success(organizationsT("createOrgSuccess"))
      closeBtnRef.current?.click()
      qc.invalidateQueries({
        queryKey: isEditMode
          ? ["org", storedOrganization?.id]
          : ["orgs" + JSON.stringify(newQueryParams)],
      })
    },
  })

  const form = useForm<OrganizationFields>({
    resolver: zodResolver(useOrgFormSchema()),
    defaultValues: isEditMode
      ? {
          ...storedOrganization,
          station_owner: storedOrganization?.station_owner.user.id,
          address_en: storedOrganization?.station_address.find(
            (item) => item.lang === i18n.language
          )?.address,
          address_ru: storedOrganization?.station_address.find(
            (item) => item.lang === i18n.language
          )?.address,
          address_kk: storedOrganization?.station_address.find(
            (item) => item.lang === i18n.language
          )?.address,
          station_area: storedOrganization?.station_area.id,
          station_type: STATION_VALUE_TYPE[
            storedOrganization?.station_type as keyof typeof STATION_VALUE_TYPE
          ] as keyof typeof STATION_TYPE_VALUE,
          latitude: storedOrganization?.latitude.toString(),
          longitude: storedOrganization?.longitude.toString(),
          station_tel: storedOrganization?.station_tel.startsWith("+7")
            ? storedOrganization?.station_tel
            : `+7${storedOrganization?.station_tel}`,
        }
      : {
          station_name: "",
          extra_station_name: "",
          station_owner: "",
          station_code: "",
          extra_code: "",
          station_tel: "+7",
          station_type: "station",
          address_kk: "",
          address_en: "",
          address_ru: "",
          latitude: "",
          longitude: "",
          is_active: true,
        },
  })

  const submitForm = (values: OrganizationFields) => {
    orgMutation.mutate({
      ...values,
      station_address: [
        {
          lang: "kk",
          address: values.address_kk,
        },
        {
          lang: "en",
          address: values.address_en,
        },
        {
          lang: "ru",
          address: values.address_ru,
        },
      ],
      station_tel: values.station_tel.substring(2),
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      station_type: STATION_TYPE_VALUE[values.station_type],
    })
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3">
        <FormField
          control={form.control}
          name="station_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.stationName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="extra_station_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {organizationsT("formLabel.extraStationName")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="station_owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.stationOwner")}</FormLabel>
              <FormControl>
                <OrganizationFormOwners
                  value={field.value}
                  onChange={field.onChange}
                  triggerLabel={`${storedOrganization?.station_owner.user.first_name} ${storedOrganization?.station_owner.user.last_name}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between space-x-3 [&>div]:flex-1">
          <FormField
            control={form.control}
            name="station_area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{organizationsT("formLabel.stationArea")}</FormLabel>
                <FormControl>
                  <FormAutocomplete
                    options={areas}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={
                      isEditMode
                        ? storedOrganization?.station_area[
                            `area_name_${i18n.language as Locale}`
                          ]
                        : organizationsT("formLabel.stationAreaPh")
                    }
                    title={organizationsT("formLabel.stationAreaPh")}
                    isLocalSearch
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="station_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{organizationsT("formLabel.stationType")}</FormLabel>
                <FormControl>
                  <OrganizationFormStationType
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between space-x-3 [&>div]:flex-1">
          <FormField
            control={form.control}
            name="station_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{organizationsT("formLabel.stationCode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="extra_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{organizationsT("formLabel.extraCode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="station_tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.stationTel")}</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_kk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.addressKz")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.addressEn")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_ru"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.addressRu")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.latitude")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.longitude")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 mr-2">
                <FormLabel className="text-base">
                  {organizationsT("formLabel.active")}
                </FormLabel>
                <FormDescription>
                  {organizationsT("formLabel.activeSubtitle")}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center pt-5">
          <SheetClose asChild ref={closeBtnRef}>
            <Button type="button" variant="outline" onClick={handleReset}>
              {commonT("button.cancel")}
            </Button>
          </SheetClose>
          <Button
            disabled={orgMutation.isPending}
            isLoading={orgMutation.isPending}
            type="submit"
            className="flex-1 ml-2"
          >
            {isEditMode ? commonT("button.save") : organizationsT("createOrg")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
