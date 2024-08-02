import { useMemo } from "react"
import { Fragment } from "react/jsx-runtime"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { getOrgDetail } from "@/modules/organizations/api/orgs-requests"
import OrganizationFormSheet from "@/modules/organizations/components/form-sheet"
import WorkingHourFormSkeleton from "@/modules/organizations/components/workin-hours-form-skeleton"
import WorkingHoursForm from "@/modules/organizations/components/working-hours-form"
import { useStationTypeLabel } from "@/modules/organizations/hooks/use-station-type-label"
import GoBackButton from "@/shared/components/go-back-button"
import InfoItem from "@/shared/components/Info-item"
import GeneralHeader from "@/shared/components/layout/general-header"
import { Layout } from "@/shared/components/layout/main.layout"
import PageTitle from "@/shared/components/page-title"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { useAuthChecker } from "@/shared/hooks/use-auth-checker"
import { formatPhoneNumber } from "@/shared/lib/utils"
import { Locale } from "@/shared/types/common.types"

export default function OrganizationRoute() {
  useAuthChecker()
  const { t: organizationsT, i18n } = useTranslation("organizations")
  const orgId = useParams().id

  const { data: orgData, isLoading } = useQuery({
    queryKey: ["org", orgId],
    queryFn: () => getOrgDetail(orgId as string),
  })
  const stationTypeLabel = useStationTypeLabel({ type: orgData?.station_type })

  const orgViewData = useMemo(() => {
    if (!orgData) return {}
    return {
      name: orgData.station_name,
      code: orgData.station_code,
      owner: `${orgData.station_owner?.user?.first_name} ${orgData.station_owner?.user?.last_name}`,
      tel: formatPhoneNumber(orgData.station_tel),
      price: orgData.station_price + " " + orgData.price_currency,
      type: stationTypeLabel,
      province:
        orgData.station_region[`area_name_${i18n.language as Locale}`] +
        ", " +
        orgData.station_area[`area_name_${i18n.language as Locale}`],
      address: orgData[`address_${i18n.language as Locale}`],
      postalCode: orgData.station_region.post_code,
      coords: orgData.latitude + ", " + orgData.longitude,
    }
  }, [i18n.language, orgData, stationTypeLabel])

  const orgViewDataLabels = useMemo(
    () => ({
      name: organizationsT("formLabel.stationName"),
      code: organizationsT("formLabel.stationCode"),
      owner: organizationsT("formLabel.stationOwner"),
      tel: organizationsT("formLabel.stationTel"),
      price: organizationsT("formLabel.stationPrice"),
      type: organizationsT("formLabel.stationType"),
      province: organizationsT("formLabel.stationArea"),
      address: organizationsT("address"),
      postalCode: organizationsT("formLabel.postalCode"),
      coords: organizationsT("coords"),
    }),
    [organizationsT]
  )

  return (
    <Fragment>
      <Layout>
        <GeneralHeader />
        <Layout.Body>
          {isLoading ? (
            <Fragment>
              <div className="space-y-2 mb-5 sm:space-y-0 sm:flex items-center justify-between">
                <Skeleton className="h-10 flex-1 mr-10 rounded-lg" />
                <Skeleton className="h-10 w-20 rounded-lg" />
              </div>
              <div className="sm:flex gap-2 items-start justify-between">
                <div className="flex-1">
                  <WorkingHourFormSkeleton />
                </div>
                <div className="flex-1">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Skeleton className="w-40 h-12 rounded-lg" />
                      <Skeleton className="h-12 flex-1 rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="space-y-2 mb-5 sm:space-y-0 sm:flex items-center justify-between">
                <GoBackButton />
                <PageTitle
                  className="flex-1 mx-5"
                  title={`${orgData?.station_name}, ${orgData?.station_owner?.user?.first_name} ${orgData?.station_owner?.user?.last_name}`}
                />
                <OrganizationFormSheet />
              </div>
              <div className="sm:flex gap-5 items-start justify-between">
                <div className="w-1/3">
                  <h3 className="font-semibold text-xl mb-3">
                    {organizationsT("workingHours")}
                  </h3>
                  <WorkingHoursForm workTimes={orgData?.work_times} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-3">
                    {organizationsT("generalInfo")}
                  </h3>
                  <div className="">
                    {Object.entries(orgViewData).map(([key, value], index) => (
                      <InfoItem
                        key={index}
                        label={
                          orgViewDataLabels[
                            key as keyof typeof orgViewDataLabels
                          ]
                        }
                        value={value as string}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Layout.Body>
      </Layout>
    </Fragment>
  )
}
