import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { getOtp } from "@/modules/auth/api/auth-requests"
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
import {
  PhoneNumberFormFields,
  usePhoneNumberFormSchema,
} from "@/modules/auth/hooks/use-auth-form-schemas"
import { useAuthStore } from "@/modules/auth/auth.store"
import { useNavigate } from "react-router-dom"
import { RouteNames } from "@/shared/lib/constants"

export function UserAuthForm() {
  const navigate = useNavigate()
  const { t: authT } = useTranslation("auth")

  const getOtpMutation = useMutation({
    mutationFn: getOtp,
    onSuccess: (data) => {
      useAuthStore.getState().setStoreData({
        isLoggedIn: true,
        token: data.access_token,
        userData: data.data,
      })
      navigate(RouteNames.ROOT, { replace: true })
    },
  })

  const form = useForm<PhoneNumberFormFields>({
    resolver: zodResolver(usePhoneNumberFormSchema()),
    defaultValues: {
      phone: "+7",
    },
  })

  function onSubmit(values: PhoneNumberFormFields) {
    getOtpMutation.mutate({
      code_type: "login",
      phone: values.phone.substring(2),
      country_code: "7",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{authT("phoneNumber")}</FormLabel>
              <FormControl>
                <Input placeholder={authT("enterThePhoneNumber")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={getOtpMutation.isPending}
          isLoading={getOtpMutation.isPending}
          type="submit"
          className="w-full"
        >
          {authT("getOTP")}
        </Button>
      </form>
    </Form>
  )
}
