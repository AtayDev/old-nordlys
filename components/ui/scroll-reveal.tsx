"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, type Variants } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  once?: boolean
  className?: string
  as?: React.ElementType
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 50,
  threshold = 0.1,
  once = true,
  className = "",
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const shouldAnimate = once ? isInView : isInView || !hasAnimated

  const getVariants = (): Variants => {
    let initial = {}

    switch (direction) {
      case "up":
        initial = { y: distance, opacity: 0 }
        break
      case "down":
        initial = { y: -distance, opacity: 0 }
        break
      case "left":
        initial = { x: distance, opacity: 0 }
        break
      case "right":
        initial = { x: -distance, opacity: 0 }
        break
      case "none":
        initial = { opacity: 0 }
        break
    }

    return {
      hidden: initial,
      visible: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
        },
      },
    }
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div variants={getVariants()} initial="hidden" animate={shouldAnimate ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </Component>
  )
}

