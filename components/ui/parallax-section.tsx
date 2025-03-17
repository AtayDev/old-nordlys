"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  overflow?: "hidden" | "visible"
  as?: React.ElementType
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  overflow = "hidden",
  as: Component = "section",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate transform values based on direction
  const getTransformValues = () => {
    const distance = 100 * speed

    switch (direction) {
      case "up":
        return { initial: distance, final: distance * -1 }
      case "down":
        return { initial: distance * -1, final: distance }
      case "left":
        return { initial: distance, final: distance * -1 }
      case "right":
        return { initial: distance * -1, final: distance }
      default:
        return { initial: distance, final: distance * -1 }
    }
  }

  const { initial, final } = getTransformValues()

  const yTransform = useTransform(scrollYProgress, [0, 1], [initial, final])
  const xTransform = useTransform(scrollYProgress, [0, 1], [initial, final])

  const y = direction === "up" || direction === "down" ? yTransform : 0

  const x = direction === "left" || direction === "right" ? xTransform : 0

  return (
    <Component ref={ref} className={`relative ${overflow === "hidden" ? "overflow-hidden" : ""} ${className}`}>
      <motion.div style={{ y, x }} className="w-full h-full">
        {children}
      </motion.div>
    </Component>
  )
}

