import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { GeneralErrorCodes, GeneralErrorResponse } from "@/shared/api/types"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      const errorData = (error as AxiosError<GeneralErrorResponse>).response
        ?.data
      toast.error(
        GeneralErrorCodes[
          errorData?.message as unknown as keyof typeof GeneralErrorCodes
        ]
      )
    },
  }),
  queryCache: new QueryCache({
    onSuccess: () => {},
    onError: () => {},
  }),
})