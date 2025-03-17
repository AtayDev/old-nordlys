import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PremiumCard({ className, children, ...props }: PremiumCardProps) {
  return (
    <div className={cn("premium-card", className)} {...props}>
      {children}
    </div>
  )
}

