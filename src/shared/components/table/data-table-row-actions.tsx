import { Edit3Icon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

interface DataTableRowActionsProps {
  onClickEdit?: () => void
}

export function DataTableRowActions(props: DataTableRowActionsProps) {
  return (
    <Button variant="secondary" size="icon" onClick={props.onClickEdit}>
      <Edit3Icon className="w-5 h-5" />
    </Button>
  )
}
