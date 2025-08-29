import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-primary text-white hover:shadow-glow shadow-medium hover-lift",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-medium",
        outline:
          "border border-primary/20 bg-background/50 hover:bg-primary/5 hover:border-primary/40 backdrop-blur-sm",
        secondary:
          "gradient-secondary text-white hover:shadow-glow shadow-medium hover-lift",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "glass-card hover:shadow-neural transition-spring border-primary/20 hover:border-primary text-primary font-semibold",
        accent: "gradient-accent text-white hover:shadow-glow transition-spring shadow-medium hover-lift",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-medium hover-lift",
        neural: "gradient-neural text-white hover:shadow-neural transition-spring shadow-glow hover-lift",
        premium: "gradient-hero text-white hover:shadow-strong transition-spring shadow-glow hover-lift font-semibold",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4",
        lg: "h-13 rounded-xl px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
