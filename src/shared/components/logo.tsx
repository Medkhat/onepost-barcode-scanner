import logo from "@/assets/one-post-logo.svg"
import { cn } from "@/shared/lib/utils"

export default function Logo({
  className,
  onlyImg,
}: {
  className?: string
  onlyImg?: boolean
}) {
  if (onlyImg) {
    return <img src={"/favicon.ico"} alt="1Post.kz" className="w-10" />
  }
  return <img src={logo} alt="1Post.kz" className={cn("w-32", className)} />
}
