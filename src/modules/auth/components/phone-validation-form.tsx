// function PhoneValidationForm({
//   phone,
//   onReset,
// }: {
//   phone: string
//   onReset: () => void
// }) {
//   const { t: authT } = useTranslation("auth")
//   const navigate = useNavigate()

//   const verifyOtpMutation = useMutation({
//     mutationFn: verifyOtp,
//     onSuccess: (data) => {
//       useAuthStore.getState().setStoreData({
//         isLoggedIn: true,
//         token: data.access_token,
//         userData: data.data,
//       })
//       navigate(RouteNames.ROOT, { replace: true })
//     },
//   })

//   const form = useForm<OtpForm>({
//     resolver: zodResolver(useOtpFormSchema()),
//     defaultValues: {
//       verification_code: "",
//     },
//   })

//   function onSubmit(data: OtpForm) {
//     verifyOtpMutation.mutate({
//       code_type: "login",
//       country_code: "7",
//       phone: phone.substring(2),
//       verification_code: data.verification_code,
//     })
//   }

//   return (
//     <Form {...form}>
//       <Button variant="ghost" className="mb-2" onClick={onReset}>
//         <ChevronLeftIcon className="mr-2" />
//         {authT("changePhone")}
//       </Button>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//         <FormField
//           control={form.control}
//           name="verification_code"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>{authT("enterOtp")}</FormLabel>
//               <FormControl>
//                 <InputOTP maxLength={4} {...field}>
//                   <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                     <InputOTPSlot index={3} />
//                   </InputOTPGroup>
//                 </InputOTP>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           disabled={verifyOtpMutation.isPending}
//           isLoading={verifyOtpMutation.isPending}
//           type="submit"
//           className="w-full"
//         >
//           {authT("sendOtp")}
//         </Button>
//       </form>
//     </Form>
//   )
// }
