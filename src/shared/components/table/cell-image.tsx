import { useTranslation } from "react-i18next"

import { cn } from "@/shared/lib/utils"
import { useModalStore } from "@/shared/store/modal.store"

export default function CellImage({
  image,
  title,
  className,
  isI18nTitle,
}: {
  image: string
  title: string
  isI18nTitle?: boolean
  className?: string
}) {
  const { t: commonT } = useTranslation("common")

  const openImageViewer = () => {
    useModalStore.setState({
      imageViewer: {
        isOpen: true,
        data: image,
        title: isI18nTitle ? commonT(title) : title,
      },
    })
  }

  return (
    <button type="button" onClick={openImageViewer}>
      <img
        src={image}
        alt={isI18nTitle ? commonT(title) : title}
        className={cn("rounded-lg", className)}
      />
    </button>
  )
}
