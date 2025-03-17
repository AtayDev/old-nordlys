"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import SceneController from "@/components/3d/scene-controller"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-[40%] right-[20%] w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* 3D Model */}
      <div className="absolute top-0 right-0 w-full h-full md:w-1/2 pointer-events-none opacity-70">
        <SceneController modelPath="/models/molecule.glb" autoRotate={true} zoom={5} position={[0, 0, 0]} />
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-4 relative z-10 pt-20 pb-20" style={{ opacity, scale, y }}>
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-slate-900 mb-6">
              Redefining <span className="font-medium text-blue-600">Chemical Engineering</span> with Advanced AI
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl text-slate-600 mb-10 max-w-2xl">
              Solvi is an AI-driven ecosystem that empowers chemical and process engineers with specialized knowledge
              and intelligent solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <AnimatedGradientBorder
              borderWidth={2}
              borderRadius={30}
              glowEffect={true}
              glowSize={15}
              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
            >
              <MagneticButton
                className="px-8 py-4 bg-white text-blue-600 font-medium rounded-full"
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              >
                Request Early Access
              </MagneticButton>
            </AnimatedGradientBorder>

            <MagneticButton
              className="px-8 py-4 bg-white border border-slate-200 text-slate-800 font-medium rounded-full hover:border-slate-300 transition-colors"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="w-6 h-6 text-slate-600 animate-bounce" />
      </motion.div>
    </section>
  )
}

