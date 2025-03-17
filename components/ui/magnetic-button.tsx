"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  radius?: number
  as?: "button" | "div" | "a"
  href?: string
  target?: string
  disabled?: boolean
}

export function MagneticButton({
  children,
  className,
  onClick,
  strength = 30,
  radius = 400,
  as = "button",
  href,
  target,
  disabled = false,
  ...props
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || disabled) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    const distance = Math.sqrt(x * x + y * y)

    if (distance < radius) {
      // Scale the movement based on distance from center
      const scaleFactor = 1 - distance / radius
      setPosition({
        x: x * scaleFactor * (strength / 10),
        y: y * scaleFactor * (strength / 10),
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [radius, strength, disabled])

  const Component = as === "a" ? motion.a : motion.button

  return (
    <div
      ref={ref}
      className={cn("relative", disabled && "opacity-70 cursor-not-allowed")}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Component
        href={as === "a" ? href : undefined}
        target={as === "a" ? target : undefined}
        onClick={!disabled ? onClick : undefined}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        className={cn("relative z-10 block", className)}
        {...props}
      >
        {children}
      </Component>
      {isHovered && !disabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.1,
            scale: 1,
            x: position.x * 0.2,
            y: position.y * 0.2,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
        />
      )}
    </div>
  )
}

