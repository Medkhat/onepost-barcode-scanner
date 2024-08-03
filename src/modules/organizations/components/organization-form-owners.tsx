import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useInfiniteQuery } from "@tanstack/react-query"

import { getOrgOwners } from "@/modules/org-owners/api/org-owners-requests"
import FormAutocomplete from "@/shared/components/form/form-autocomplete"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { LabelValue } from "@/shared/types/common.types"

type OrganizationFormOwnersProps = {
  value: string
  onChange: (value: string) => void
  triggerLabel?: string
}
const P_SIZE = 30
export default function OrganizationFormOwners(
  props: OrganizationFormOwnersProps
) {
  const { queryParams } = useQueryParams()
  const { t: organizationsT } = useTranslation("organizations")

  const {
    data: ownersData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["orgOwners", queryParams.autocomplete],
    queryFn: ({ pageParam }) =>
      getOrgOwners({
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

  const formattedOwners = useMemo(
    (): LabelValue[] =>
      ownersData?.pages.flatMap((page) =>
        page.results?.map((owner) => ({
          label: owner.user.first_name + " " + owner.user.last_name,
          value: owner.user.id as string,
          sublabel: owner.user.email,
        }))
      ) as LabelValue[],
    [ownersData]
  )

  const onScrollEnd = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FormAutocomplete
      options={formattedOwners}
      value={props.value}
      onChange={props.onChange}
      placeholder={organizationsT("formLabel.stationOwnerPh")}
      title={organizationsT("formLabel.stationOwnerPh")}
      onScrollEnd={onScrollEnd}
      isFetchingNext={isFetchingNextPage}
      isLoading={isLoading}
      externalLabel={props.triggerLabel}
    />
  )
}
