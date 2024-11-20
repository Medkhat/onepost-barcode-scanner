import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"

import { LoginType } from "@/modules/auth/api/auth.types"
import { signIn } from "@/modules/auth/api/auth-requests"
import { useAuthStore } from "@/modules/auth/auth.store"
import {
  SignInPayload,
  useSignInFormSchema,
} from "@/modules/auth/hooks/use-auth-form-schemas"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Switch } from "@/shared/components/ui/switch"
import { RouteNames } from "@/shared/lib/constants"

export function UserAuthForm() {
  const navigate = useNavigate()
  const { t: authT } = useTranslation("auth")

  const [loginType, setLoginType] = useState<LoginType>("phone")

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      useAuthStore.getState().setStoreData({
        isLoggedIn: true,
        token: data.access_token,
        userData: data.data,
      })
      navigate(RouteNames.ROOT, { replace: true })
    },
  })

  const form = useForm<SignInPayload>({
    resolver: zodResolver(useSignInFormSchema(loginType)),
    defaultValues: {
      email: "",
      password: "",
      phone: "+7",
    },
  })

  function onSubmit(values: SignInPayload) {
    signInMutation.mutate(
      loginType === "email"
        ? values
        : {
            phone: (values as { phone: string }).phone.substring(2),
            password: values.password,
          }
    )
  }

  const handleChangeEmailLogin = (checked: boolean) => {
    setLoginType(checked ? "email" : "phone")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <Label className="flex items-center justify-between">
          <span>{authT("emailLogin")}</span>
          <Switch onCheckedChange={handleChangeEmailLogin} />
        </Label>
        {loginType === "email" ? (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={authT("enterTheEmail")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={authT("enterThePhoneNumber")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder={authT("enterThePassword")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={signInMutation.isPending}
          isLoading={signInMutation.isPending}
          type="submit"
          className="w-full"
        >
          {authT("signIn")}
        </Button>
      </form>
    </Form>
  )
}
