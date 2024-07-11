import CommonModal from "@/shared/components/common-modal"
import { useModalStore } from "@/shared/store/modal.store"

export default function ImageViewer() {
  const data = useModalStore((state) => state.imageViewer?.data)

  return (
    <CommonModal modal="imageViewer">
      <img src={data} alt="Product" className="h-[100svh/2]" />
    </CommonModal>
  )
}
