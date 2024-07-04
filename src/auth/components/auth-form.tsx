import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
    <PhoneValidationForm phone={phoneData.phone} />
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
          .min(11, {
            message: authT("phoneValidation"),
          })
          .max(11, {
            message: authT("phoneValidation"),
          }),
      }),
    [authT]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+7",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    onCodeSent(values.phone)
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {authT("getOTP")}
        </Button>
      </form>
    </Form>
  )
}

function PhoneValidationForm({ phone }: { phone: string }) {
  const { t: authT } = useTranslation("auth")
  const formSchema = useMemo(
    () =>
      z.object({
        verification_code: z.string().min(4, {
          message: authT("phoneValidation"),
        }),
      }),
    [authT]
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verification_code: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="verification_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
