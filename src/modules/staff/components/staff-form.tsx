import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { CreateStaffPayload } from "@/modules/staff/api/staff.types"
import { createStaff } from "@/modules/staff/api/staff-requests"
import { useStaffFormSchema } from "@/modules/staff/hooks/use-staff-form-schema"
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

export default function StaffForm() {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const { t: staffT } = useTranslation("staff")
  const { t: commonT } = useTranslation("common")
  const formSchema = useStaffFormSchema()
  const { queryParams } = useQueryParams()

  const qc = useQueryClient()
  const creatMutation = useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      toast.success(staffT("createStaffSuccess"))
      closeBtnRef.current?.click()
      qc.invalidateQueries({
        queryKey: ["staff" + queryParams.page + queryParams.pSize],
      })
    },
  })

  const form = useForm<CreateStaffPayload>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "+7",
    },
  })

  const submitForm = (values: CreateStaffPayload) => {
    creatMutation.mutate(values)
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
              <FormLabel>{staffT("formLabel.firstName")}</FormLabel>
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
              <FormLabel>{staffT("formLabel.lastName")}</FormLabel>
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
              <FormLabel>{staffT("formLabel.email")}</FormLabel>
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
              <FormLabel>{staffT("formLabel.phone")}</FormLabel>
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
            {staffT("createStaff")}
          </Button>
        </div>
      </form>
    </Form>
  )
}