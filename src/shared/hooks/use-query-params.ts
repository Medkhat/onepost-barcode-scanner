import { useNavigate, useSearchParams } from "react-router-dom"

import { BaseQueryParams } from "@/shared/api/types"
import { DEFAULT_PAGE_SIZE } from "@/shared/lib/constants"

export function useQueryParams<TParams extends BaseQueryParams>(): {
  queryParams: TParams
  navToNewParams: (params: TParams) => void
} {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  return {
    queryParams: {
      page: Number(searchParams.get("page") ?? 1),
      pSize: Number(searchParams.get("pSize") ?? DEFAULT_PAGE_SIZE),
    } as TParams,
    navToNewParams: (params: TParams) => {
      const newSearchParams = new URLSearchParams(searchParams)
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, String(value))
        } else {
          newSearchParams.delete(key)
        }
      })
      navigate({ search: newSearchParams.toString() })
    },
  }
}
