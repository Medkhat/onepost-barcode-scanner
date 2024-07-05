import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  OrgFormValues,
  useOrgFormSchema,
} from "@/modules/organizations/components/form/form-schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"

export default function OrganizationForm() {
  const { t: organizationsT } = useTranslation("organizations")
  const formSchema = useOrgFormSchema()

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
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
        <div className="flex items-center justify-between space-x-3">
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
