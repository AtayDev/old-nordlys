"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  borderWidth?: number
  borderRadius?: number
  duration?: number
  colors?: string[]
  hoverEffect?: boolean
  glowEffect?: boolean
  glowColor?: string
  glowSize?: number
}

export function AnimatedGradientBorder({
  children,
  className = "",
  containerClassName = "",
  borderWidth = 1,
  borderRadius = 8,
  duration = 8,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
  hoverEffect = true,
  glowEffect = true,
  glowColor = "rgba(59, 130, 246, 0.5)",
  glowSize = 10,
}: AnimatedGradientBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("relative group", containerClassName)}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit] z-0"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: `${colors.length * 100}% 100%`,
          padding: `${borderWidth}px`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", `${-100 * (colors.length - 1)}% 0%`],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] opacity-0 z-0 blur-xl transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${colors.join(", ")})`,
            backgroundSize: `${colors.length * 100}% 100%`,
            filter: `blur(${glowSize}px)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", `${-100 * (colors.length - 1)}% 0%`],
            opacity: hoverEffect ? [0, 0] : [0, 0.5, 0],
          }}
          transition={{
            backgroundPosition: {
              duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            },
            opacity: {
              duration: duration / 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          whileHover={hoverEffect ? { opacity: 0.5, transition: { duration: 0.3 } } : undefined}
        />
      )}

      <div className={cn("relative z-10 bg-white rounded-[inherit]", className)}>{children}</div>
    </div>
  )
}

