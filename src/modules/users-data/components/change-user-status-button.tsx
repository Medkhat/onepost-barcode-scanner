import { FilePenLineIcon } from "lucide-react"

import { UsersData } from "@/modules/users-data/api/users-data.types"
import { useUsersDataStore } from "@/modules/users-data/store/users-data.store"
import { Button } from "@/shared/components/ui/button"
import { DialogTrigger } from "@/shared/components/ui/dialog"

export default function ChangeUsersDataStatus({
  usersData,
}: {
  usersData: UsersData
}) {
  const handleClick = () => {
    useUsersDataStore.setState({ usersData })
  }
  return (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={handleClick}
      >
        <FilePenLineIcon className="h-4 w-4" />
        <span className="sr-only">Change status</span>
      </Button>
    </DialogTrigger>
  )
}
