import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeftIcon } from "lucide-react"
import { z } from "zod"

import { getOtp, verifyOtp } from "@/modules/auth/api/auth-requests"
import { useAuthStore } from "@/modules/auth/store/auth.store"
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp"
import { RouteNames } from "@/shared/lib/constants"

type PhoneData = {
  isCodeSent: boolean
  phone: string
}

export function UserAuthForm() {
  const [phoneData, setPhoneData] = useState<PhoneData>({
    isCodeSent: false,
    phone: "",
  })

  return phoneData.isCodeSent ? (
    <PhoneValidationForm
      phone={phoneData.phone}
      onReset={() =>
        setPhoneData({
          isCodeSent: false,
          phone: "",
        })
      }
    />
  ) : (
    <PhoneNumberForm
      onCodeSent={(phone) => {
        setPhoneData({
          isCodeSent: true,
          phone,
        })
      }}
    />
  )
}

function PhoneNumberForm({
  onCodeSent,
}: {
  onCodeSent: (phone: string) => void
}) {
  const { t: authT } = useTranslation("auth")

  const formSchema = useMemo(
    () =>
      z.object({
        phone: z
          .string()
          .min(12, {
            message: authT("phoneValidation"),
          })
          .max(12, {
            message: authT("phoneValidation"),
          }),
      }),
    [authT]
  )

  const getOtpMutation = useMutation({
    mutationFn: getOtp,
    onSuccess: (_data, vars) => {
      onCodeSent("+" + vars.country_code + vars.phone)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+7",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
              <FormLabel>{authT("phonePh")}</FormLabel>
              <FormControl>
                <Input placeholder={authT("phonePh")} {...field} />
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

function PhoneValidationForm({
  phone,
  onReset,
}: {
  phone: string
  onReset: () => void
}) {
  const { t: authT } = useTranslation("auth")
  const navigate = useNavigate()

  const formSchema = useMemo(
    () =>
      z.object({
        verification_code: z.string().min(4, {
          message: authT("otpValidation"),
        }),
      }),
    [authT]
  )

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      useAuthStore.getState().setStoreData({
        isLoggedIn: true,
        token: data.access_token,
        userData: data.data,
      })
      navigate(RouteNames.ROOT, { replace: true })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verification_code: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    verifyOtpMutation.mutate({
      code_type: "login",
      country_code: "7",
      phone: phone.substring(2),
      verification_code: data.verification_code,
    })
  }

  return (
    <Form {...form}>
      <Button variant="ghost" className="mb-2" onClick={onReset}>
        <ChevronLeftIcon className="mr-2" />
        {authT("changePhone")}
      </Button>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="verification_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{authT("enterOtp")}</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={verifyOtpMutation.isPending}
          isLoading={verifyOtpMutation.isPending}
          type="submit"
          className="w-full"
        >
          {authT("sendOtp")}
        </Button>
      </form>
    </Form>
  )
}
