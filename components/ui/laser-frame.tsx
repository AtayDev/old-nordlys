"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface LaserFrameProps {
  className?: string
  children: React.ReactNode
}

export function LaserFrame({ className = "", children }: LaserFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const beams = Array.from({ length: 4 }).map(() => {
      const beam = document.createElement("div")
      beam.className = "absolute"
      return beam
    })

    // Define gradient colors
    const gradients = [
      "linear-gradient(90deg, transparent, #60A5FA, #818CF8, #34D399, transparent)", // Horizontal (blue-purple-green)
      "linear-gradient(90deg, transparent, #818CF8, #C084FC, #60A5FA, transparent)", // Horizontal (purple-pink-blue)
      "linear-gradient(180deg, transparent, #60A5FA, #818CF8, #34D399, transparent)", // Vertical (blue-purple-green)
      "linear-gradient(180deg, transparent, #818CF8, #C084FC, #60A5FA, transparent)", // Vertical (purple-pink-blue)
    ]

    beams.forEach((beam, index) => {
      const isVertical = index >= 2
      beam.style.background = gradients[index]
      beam.style.animation = `laser-slide${isVertical ? "-vertical" : ""}${
        index % 2 === 1 ? "-reverse" : ""
      } 3s linear infinite`

      if (isVertical) {
        beam.style.width = "3px"
        beam.style.height = "100%"
        beam.style.top = "0"
        beam.style[index === 2 ? "left" : "right"] = "0"
      } else {
        beam.style.width = "100%"
        beam.style.height = "3px"
        beam.style.left = "0"
        beam.style[index === 0 ? "top" : "bottom"] = "0"
      }

      beam.style.filter = "blur(2px) brightness(1.5)"
      beam.style.opacity = "0"
      beam.style.transition = "opacity 0.3s ease"

      frame.insertBefore(beam, frame.firstChild)
    })

    const handleMouseEnter = () => {
      beams.forEach((beam) => {
        beam.style.opacity = "1"
      })
    }

    const handleMouseLeave = () => {
      beams.forEach((beam) => {
        beam.style.opacity = "0"
      })
    }

    frame.addEventListener("mouseenter", handleMouseEnter)
    frame.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      frame.removeEventListener("mouseenter", handleMouseEnter)
      frame.removeEventListener("mouseleave", handleMouseLeave)
      beams.forEach((beam) => frame.removeChild(beam))
    }
  }, [])

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden rounded-xl", className)}>
      {children}
    </div>
  )
}

