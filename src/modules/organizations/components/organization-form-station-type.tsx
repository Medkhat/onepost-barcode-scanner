import { STATION_TYPE_VALUE } from "@/modules/organizations/api/organizations.types"
import { useStationTypeLabel } from "@/modules/organizations/hooks/use-station-type-label"
import FormSelect from "@/shared/components/form/form-select"
import { LabelValue } from "@/shared/types/common.types"

export default function OrganizationFormStationType({
  value,
  onChange,
}: {
  value: keyof typeof STATION_TYPE_VALUE
  onChange: (value: string) => void
}) {
  const stationTypeLabels = useStationTypeLabel({ returnAll: true })
  const stationTypes: LabelValue[] = Object.entries(STATION_TYPE_VALUE).map(
    ([key]) => ({
      label: stationTypeLabels[key as keyof typeof stationTypeLabels],
      value: key,
    })
  )
  return (
    <FormSelect
      defaultValue={value}
      onValueChange={onChange}
      options={stationTypes}
      isFormItem
      placeholder=""
    />
  )
}
