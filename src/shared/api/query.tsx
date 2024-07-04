import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

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
    onError: () => {},
  }),
  queryCache: new QueryCache({
    onSuccess: () => {},
    onError: () => {},
  }),
})
