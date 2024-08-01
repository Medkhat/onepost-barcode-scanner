import { useStationTypeLabel } from "@/modules/organizations/hooks/use-station-type-label"
import { Badge } from "@/shared/components/ui/badge"

export default function OrganizationType({ type }: { type: number }) {
  const typeLabel = useStationTypeLabel({ type })
  return <Badge>{typeLabel as string}</Badge>
}
