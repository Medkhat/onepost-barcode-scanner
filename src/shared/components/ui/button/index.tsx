import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "@/shared/components/ui/button/variants"
import SpinnerIcon from "@/shared/icons/spinner"
import { cn } from "@/shared/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        {isLoading && <SpinnerIcon className="ml-2 h-4 w-4 animate-spin" />}
      </Comp>
    )
  }
)
Button.displayName = "Button"
