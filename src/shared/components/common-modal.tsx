import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils"
import { Modals, useModalStore } from "@/shared/store/modal.store"

type CommonModal = {
  modal: Modals
  children: React.ReactNode
  className?: string
}

export default function CommonModal({
  modal,
  children,
  className,
}: CommonModal) {
  const isOpen = useModalStore((state) => state[modal]?.isOpen)
  const title = useModalStore((state) => state[modal]?.title)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      useModalStore.setState({ [modal]: null })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby="modal-description"
        className={cn("max-h-[calc(100svh-24px)] overflow-y-auto", className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
