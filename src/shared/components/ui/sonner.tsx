import { Toaster as Sonner } from "sonner"

import { useTheme } from "@/shared/components/theme/use-theme"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      richColors
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      {...props}
    />
  )
}

export { Toaster }
