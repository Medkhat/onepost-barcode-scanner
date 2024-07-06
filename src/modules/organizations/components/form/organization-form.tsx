import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"

import { getOrgOwners } from "@/modules/organizations/api/requests"
import {
  OrgFormValues,
  useOrgFormSchema,
} from "@/modules/organizations/components/form/form-schema"
import FormAutocomplete from "@/shared/components/form/form-autocomplete"
import FormSelect from "@/shared/components/form/form-select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { currencies } from "@/shared/lib/constants"
import { LabelValue } from "@/shared/types/common.types"

export default function OrganizationForm() {
  const { t: organizationsT } = useTranslation("organizations")
  const formSchema = useOrgFormSchema()

  const { data } = useQuery({
    queryKey: ["orgOwners"],
    queryFn: () => getOrgOwners(),
  })
  const formattedOwners = useMemo(
    (): LabelValue[] =>
      data?.results?.length
        ? data?.results.map((owner) => ({
            label: owner.user.first_name + " " + owner.user.last_name,
            value: owner.user.id as string,
            sublabel: owner.user.email,
          }))
        : [],
    [data]
  )

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      station_name: "",
      extra_station_name: "",
      station_owner: "",
      station_code: "",
      extra_code: "",
      station_tel: "",
      station_price: 0,
      price_currency: "KZT",
      address_kz: "",
      address_en: "",
      address_ru: "",
      latitude: 0,
      longitude: 0,
    },
  })

  const submitForm = (values: OrgFormValues) => {
    console.log(values)
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
              <FormAutocomplete
                options={formattedOwners}
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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
                  <Input type="number" {...field} />
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
          name="address_kz"
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
