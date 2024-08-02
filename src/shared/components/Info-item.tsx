import { cn } from "@/shared/lib/utils"

export default function InfoItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div
      className={cn("flex items-stretch mb-2 border border-muted rounded-xl")}
    >
      <div className="w-40 p-3 text-center bg-muted rounded-l-xl">
        <p>{label}</p>
      </div>
      <div className="p-3 text-center">
        <p>{value}</p>
      </div>
    </div>
  )
}
