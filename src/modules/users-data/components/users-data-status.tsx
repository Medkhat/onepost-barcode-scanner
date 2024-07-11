import { useTranslation } from "react-i18next"

import { UserStatus } from "@/modules/users-data/api/users-data.types"
import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"

const i18nkeyByStatus: Record<UserStatus, string> = {
  1: "pending",
  2: "approved",
  3: "rejected",
}
const colorByStatus: Record<UserStatus, string> = {
  1: "bg-orange-500",
  2: "bg-green-600",
  3: "bg-destructive",
}

export default function UsersDataStatus({ status }: { status: UserStatus }) {
  const { t: usersDataT } = useTranslation("usersData")
  return (
    <Badge className={cn(colorByStatus[status])}>
      {usersDataT(i18nkeyByStatus[status])}
    </Badge>
  )
}
