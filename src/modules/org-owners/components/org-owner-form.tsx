import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { OrgOwnerPayload } from "@/modules/org-owners/api/org-owners.types"
import { createOrgOwner } from "@/modules/org-owners/api/org-owners-requests"
import { useOrgOwnerFormSchema } from "@/modules/org-owners/hooks/use-org-owner-form-schema"
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

export default function OrgOwnerForm() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const { t: orgOwnersT } = useTranslation("orgOwners")
  const { t: commonT } = useTranslation("common")
  const formSchema = useOrgOwnerFormSchema()
  const { queryParams } = useQueryParams()

  const qc = useQueryClient()
  const creatMutation = useMutation({
    mutationFn: createOrgOwner,
    onSuccess: () => {
      toast.success(orgOwnersT("createOrgOwnerSuccess"))
      closeBtnRef.current?.click()
      qc.invalidateQueries({
        queryKey: ["orgOwners" + queryParams.page + queryParams.pSize],
      })
    },
  })

  const form = useForm<OrgOwnerPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "+7",
    },
  })

  const submitForm = (values: OrgOwnerPayload) => {
    creatMutation.mutate({ ...values, phone: values.phone.substring(2) })
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{orgOwnersT("formLabel.firstName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{orgOwnersT("formLabel.lastName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{orgOwnersT("formLabel.email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{orgOwnersT("formLabel.phone")}</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
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
            {orgOwnersT("createOrgOwner")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
