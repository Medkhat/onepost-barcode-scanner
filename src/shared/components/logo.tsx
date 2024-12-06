import logo from "@/assets/one-post-logo.svg"
import { cn } from "@/shared/lib/utils"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className="relative">
      <img src={logo} alt="1Post.kz" className={cn("w-48", className)} />
      <span className="absolute font-medium -bottom-2 right-0">SCAN&PRINT</span>
    </div>
  )
}
