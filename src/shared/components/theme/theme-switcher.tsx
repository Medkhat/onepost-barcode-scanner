import { ColorMode } from "@/shared/components/theme/theme.types"
import { useColorModes, useTheme } from "@/shared/components/theme/use-theme"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const colorModes = useColorModes()

  const activeColorMode = colorModes.find(
    (item) => item.value === theme
  ) as ColorMode

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <activeColorMode.Icon className="w-5 h-5" />
          <span className="hidden sm:inline ml-2">{activeColorMode.label}</span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {colorModes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => setTheme(item.value)}
            className="flex items-center"
          >
            {<item.Icon className="w-5 h-5 mr-2" />}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
