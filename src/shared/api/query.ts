import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { useAuthStore } from "@/modules/auth/auth.store"
import { GeneralErrorCodes, GeneralErrorResponse } from "@/shared/api/types"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      const errorData = (error as AxiosError<GeneralErrorResponse>).response
        ?.data
      if (errorData?.code && errorData?.code >= 500) {
        toast.error(
          "Internal server error, please try again later or contact support."
        )
      } else {
        toast.error(
          GeneralErrorCodes[
            errorData?.message as unknown as keyof typeof GeneralErrorCodes
          ]
        )
      }
    },
  }),
  queryCache: new QueryCache({
    onSuccess: () => {},
    onError: (error) => {
      const status = (error as AxiosError<GeneralErrorResponse>).response
        ?.status

      if (status === 401) {
        useAuthStore.getState().logout()
      }
    },
  }),
})
