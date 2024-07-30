import {
  STATION_TYPE,
  useStationTypeLabel,
} from "@/modules/organizations/hooks/use-station-type-label"
import { Badge } from "@/shared/components/ui/badge"

export default function OrganizationType({
  type,
}: {
  type: keyof typeof STATION_TYPE
}) {
  const typeLabel = useStationTypeLabel({ type })
  return <Badge>{typeLabel}</Badge>
}
