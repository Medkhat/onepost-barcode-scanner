import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { badgeVariants } from "@/shared/components/ui/badge/variants"
import { cn } from "@/shared/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }