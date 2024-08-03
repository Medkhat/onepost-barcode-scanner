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
import FormSelect from "@/shared/components/form/form-select"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { SheetClose } from "@/shared/components/ui/sheet"
import { useAreas } from "@/shared/hooks/use-areas"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { currencies } from "@/shared/lib/constants"
import { Locale } from "@/shared/types/common.types"

export default function OrganizationForm() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const { t: organizationsT, i18n } = useTranslation("organizations")
  const { t: commonT } = useTranslation("common")

  const formSchema = useOrgFormSchema()
  const { queryParams } = useQueryParams()
  const areas = useAreas()

  const storedOrganization = useOrganizationsStore(
    (state) => state.organization
  )
  const isEditMode = Boolean(storedOrganization)

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
          : ["orgs" + queryParams.page + queryParams.pSize],
      })
    },
  })

  const form = useForm<OrganizationFields>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode
      ? {
          ...storedOrganization,
          station_owner: storedOrganization?.station_owner.user.id,
          station_area: storedOrganization?.station_area.id,
          station_type: STATION_VALUE_TYPE[
            storedOrganization?.station_type as keyof typeof STATION_VALUE_TYPE
          ] as keyof typeof STATION_TYPE_VALUE,
          post_code: storedOrganization?.station_area.post_code,
          station_price: storedOrganization?.station_price.toString(),
          latitude: storedOrganization?.latitude.toString(),
          longitude: storedOrganization?.longitude.toString(),
        }
      : {
          station_name: "",
          extra_station_name: "",
          station_owner: "",
          station_code: "",
          post_code: "",
          extra_code: "",
          station_tel: "+7",
          station_type: "station",
          station_price: "",
          price_currency: "KZT",
          address_kk: "",
          address_en: "",
          address_ru: "",
          latitude: "",
          longitude: "",
        },
  })

  const submitForm = (values: OrganizationFields) => {
    orgMutation.mutate({
      ...values,
      station_price: Number(values.station_price),
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
            name="post_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{organizationsT("formLabel.postalCode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <div className="flex items-center justify-between space-x-3 [&>div]:flex-1">
          <FormField
            control={form.control}
            name="station_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {organizationsT("formLabel.stationPrice")}
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
            name="price_currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {organizationsT("formLabel.priceCurrency")}
                </FormLabel>
                <FormControl>
                  <FormSelect
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    options={currencies}
                    placeholder={organizationsT("formLabel.priceCurrencyPh")}
                    isFormItem
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
