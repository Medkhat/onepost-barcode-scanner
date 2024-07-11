import { create } from "zustand"

export type Modals = "imageViewer"

type ModalStore = Record<
  Modals,
  { title: string; isOpen: boolean; data?: string } | null
>

export const useModalStore = create<ModalStore>(() => ({
  imageViewer: null,
}))
