"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  duration?: number
}

export function BorderBeam({ className = "", duration = 3 }: BorderBeamProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <div className={cn("absolute inset-0 [mask-image:linear-gradient(white,transparent)] ", className)}>
        <div
          className="absolute inset-0 animate-[spin_4s_linear_infinite]"
          style={{
            background: "conic-gradient(from 0deg, #10b981, #ec4899, #ffffff, #10b981)",
            animationDuration: `${duration}s`,
          }}
        />
      </div>
    </div>
  )
}

