import { useMemo, useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { getOrgOwners } from "@/modules/org-owners/api/org-owners-requests"
import {
  CreateOrgPayload,
  OrganizationFields,
  OrganizationItem,
} from "@/modules/organizations/api/organizations.types"
import { createOrg } from "@/modules/organizations/api/orgs-requests"
import { useOrgFormSchema } from "@/modules/organizations/hooks/use-form-schema"
import { getAreas } from "@/shared/api/requests"
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
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { currencies } from "@/shared/lib/constants"
import { convertAreas } from "@/shared/lib/utils"
import { LabelValue, Locale } from "@/shared/types/common.types"

export default function OrganizationForm() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const { t: organizationsT, i18n } = useTranslation("organizations")
  const { t: commonT } = useTranslation("common")
  const formSchema = useOrgFormSchema()
  const { queryParams } = useQueryParams()

  const qc = useQueryClient()
  const { data: ownersData } = useQuery({
    queryKey: ["orgOwners"],
    queryFn: () => getOrgOwners({ page: 1, pSize: 50 }),
  })
  const { data: areasData } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAreas(),
  })
  const creatMutation = useMutation<
    OrganizationItem,
    AxiosError,
    CreateOrgPayload
  >({
    mutationFn: createOrg,
    onSuccess: () => {
      toast.success(organizationsT("createOrgSuccess"))
      closeBtnRef.current?.click()
      qc.invalidateQueries({
        queryKey: ["orgs" + queryParams.page + queryParams.pSize],
      })
    },
  })

  const formattedOwners = useMemo(
    (): LabelValue[] =>
      ownersData?.results?.map((owner) => ({
        label: owner.user.first_name + " " + owner.user.last_name,
        value: owner.user.id as string,
        sublabel: owner.user.email,
      })) as LabelValue[],
    [ownersData]
  )
  const formattedAreas = useMemo(
    (): LabelValue[] =>
      convertAreas(areasData, i18n.language as Locale) as LabelValue[],
    [areasData, i18n.language]
  )

  const form = useForm<OrganizationFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      station_name: "",
      extra_station_name: "",
      station_owner: "",
      station_code: "",
      post_code: "",
      extra_code: "",
      station_tel: "+7",
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
    creatMutation.mutate({
      ...values,
      station_price: Number(values.station_price),
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
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
              <FormAutocomplete
                options={formattedOwners}
                value={field.value}
                onChange={field.onChange}
                placeholder={organizationsT("formLabel.stationOwnerPh")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="station_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{organizationsT("formLabel.stationArea")}</FormLabel>
              <FormAutocomplete
                options={formattedAreas}
                value={field.value}
                onChange={field.onChange}
                placeholder={organizationsT("formLabel.stationAreaPh")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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
            disabled={creatMutation.isPending}
            isLoading={creatMutation.isPending}
            type="submit"
            className="flex-1 ml-2"
          >
            {organizationsT("createOrg")}
          </Button>
        </div>
      </form>
    </Form>
  )
}