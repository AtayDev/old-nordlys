"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveCursorProps {
  color?: string
  size?: number
  hoverScale?: number
  clickScale?: number
  mixBlendMode?: string
  trailCount?: number
  trailDelay?: number
  trailSize?: number
  trailOpacity?: number
  showTrail?: boolean
}

export function InteractiveCursor({
  color = "#3b82f6",
  size = 20,
  hoverScale = 2.5,
  clickScale = 0.8,
  mixBlendMode = "normal",
  trailCount = 5,
  trailDelay = 0.05,
  trailSize = 0.7,
  trailOpacity = 0.3,
  showTrail = true,
}: InteractiveCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Generate trail positions with delay
  const trailPositions = Array.from({ length: trailCount }).map((_, i) => {
    const delay = i * trailDelay
    return {
      x: position.x,
      y: position.y,
      delay,
      size: size * Math.pow(trailSize, i + 1),
      opacity: trailOpacity * Math.pow(0.9, i),
    }
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    // Check for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-hover")

      setHoveredElement(isInteractive ? target : null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousemove", handleElementHover)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none"

    const links = document.querySelectorAll("a, button, input, textarea, select, [role='button'], .cursor-hover")
    links.forEach((link) => {
      link.style.cursor = "none"
    })

    return () => {
      document.body.style.cursor = ""
      links.forEach((link) => {
        link.style.cursor = ""
      })
    }
  }, [])

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          {/* Main cursor */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
            style={{
              backgroundColor: color,
              mixBlendMode,
            }}
            animate={{
              x: position.x - size / 2,
              y: position.y - size / 2,
              scale: clicked ? clickScale : hoveredElement ? hoverScale : 1,
              opacity: 1,
              width: size,
              height: size,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          />

          {/* Cursor trails */}
          {showTrail &&
            trailPositions.map((trail, index) => (
              <motion.div
                key={index}
                className="fixed top-0 left-0 pointer-events-none z-40 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: trail.opacity,
                  mixBlendMode,
                }}
                animate={{
                  x: position.x - trail.size / 2,
                  y: position.y - trail.size / 2,
                  width: trail.size,
                  height: trail.size,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 24,
                  mass: 0.5,
                  delay: trail.delay,
                }}
              />
            ))}
        </>
      )}
    </AnimatePresence>
  )
}

