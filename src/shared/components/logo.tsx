import logo from "@/assets/logo.svg"
import { cn } from "@/shared/lib/utils"

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="text-right mr-2">
        <h3 className="text-primary text-3xl tracking-wide font-semibold -mb-1">
          uda
        </h3>
        <h3 className="text-primary text-[9px] font-medium uppercase">
          express
        </h3>
      </div>
      <img src={logo} alt="UDA Express" className="w-12 h-12" />
    </div>
  )
}
