"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  children: ReactNode
  showShimmer?: boolean
}

export const ShimmerButton = ({
  shimmerColor = "#ffffff",
  shimmerSize = "0.1em",
  borderRadius = "100px",
  shimmerDuration = "2s",
  background = "linear-gradient(to right, #4F46E5, #06B6D4)",
  children,
  className,
  showShimmer = true,
  ...props
}: ShimmerButtonProps) => {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative cursor-pointer overflow-hidden whitespace-nowrap px-6 py-4 [background:var(--background)] [border-radius:var(--border-radius)]",
        className,
      )}
      {...props}
    >
      {showShimmer && (
        <div className="absolute inset-0">
          <div className="absolute inset-[-150%] animate-[spin_3.3s_linear_infinite] h-[400%] w-[400%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)]" />
        </div>
      )}
      <div className="absolute inset-[1.5px] rounded-[calc(var(--border-radius)-1.5px)] [background:var(--background)]" />
      <div className="relative z-10">{children}</div>
    </button>
  )
}

