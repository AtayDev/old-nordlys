"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      heroRef.current.style.setProperty("--mouse-x", `${x}`)
      heroRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={
        {
          "--mouse-x": "0.5",
          "--mouse-y": "0.5",
        } as React.CSSProperties
      }
    >
      {/* Subtle gradient background that follows mouse */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), #000, transparent 50%)",
        }}
      />

      <div className="container-xl relative z-10">
        <div className="max-w-3xl fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            Introducing Solvi
          </h1>

          <h2 className="text-3xl md:text-4xl font-light text-neutral-800 mb-6">
            Advanced AI for Chemical Engineering
          </h2>

          <p className="text-xl text-neutral-600 mb-12 max-w-2xl" style={{"textAlign":"justify"}}>
            Solvi is a first of a kind AI-driven ecosystem transforming chemical engineering by augmenting workflows through safe, reliable, and tailored industrial AI solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="#premiumCta" className="button-primary group">
              Request Early Access
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link href="/about" className="button-outline">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

