import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useInfiniteQuery } from "@tanstack/react-query"
import { XIcon } from "lucide-react"

import { getOrgs } from "@/modules/organizations/api/orgs-requests"
import FormAutocomplete from "@/shared/components/form/form-autocomplete"
import { Button } from "@/shared/components/ui/button"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { LabelValue } from "@/shared/types/common.types"

const P_SIZE = 30
const FilterByOrganizations = memo(() => {
  const { queryParams, navToNewParams } = useQueryParams()
  const { t: ordersT } = useTranslation("orders")

  const {
    data: orgsData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["orgs", queryParams.autocomplete],
    queryFn: ({ pageParam }) =>
      getOrgs({
        page: pageParam,
        pSize: P_SIZE,
        search: queryParams.autocomplete,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (Math.ceil(lastPage.count / P_SIZE) > lastPageParam) {
        return lastPageParam + 1
      } else {
        return
      }
    },
  })

  const formattedOrgs = useMemo(
    (): LabelValue[] =>
      orgsData?.pages.flatMap((page) =>
        page.results?.map((org) => ({
          label: org.station_name,
          value: org.id as string,
          sublabel:
            org.station_owner.user.first_name +
            " " +
            org.station_owner.user.last_name,
        }))
      ) as LabelValue[],
    [orgsData]
  )

  const handleSelect = (value: string) => {
    navToNewParams({ ...queryParams, station: value })
  }

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className="flex items-center">
      <FormAutocomplete
        options={formattedOrgs}
        value={queryParams.station}
        onChange={handleSelect}
        placeholder={ordersT("selectOrg")}
        title={ordersT("selectOrg")}
        onScrollEnd={onScrollEnd}
        isFetchingNext={isFetchingNextPage}
        isLoading={isLoading}
        triggerClassName="w-48"
      />
      {queryParams.station && (
        <Button
          size="icon"
          variant="outline"
          className="ml-2"
          onClick={() => navToNewParams({ ...queryParams, station: undefined })}
        >
          <XIcon className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
})

export default FilterByOrganizations
