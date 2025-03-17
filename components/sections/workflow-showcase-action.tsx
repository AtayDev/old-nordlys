"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const screenshots = [
  {
    id: 1,
    title: "AI Action Agents",
    description: "Specialized AI agents for every engineering task, from HAZID reports to equipment management.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20015939-RLmIZj7IhrTJB9ijzuIJ8liVxEYrFj.png",
    features: ["Automated documentation", "Process safety analysis", "Equipment management", "Risk assessment"],
  },
  {
    id: 2,
    title: "Project Dashboard",
    description: "Comprehensive overview of your engineering projects and AI co-engineers.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20015959-exAE65CfWgXqR72oCd0LXbrlVd1GM4.png",
    features: ["Project tracking", "AI co-engineer collaboration", "Document management", "Progress monitoring"],
  },
  {
    id: 3,
    title: "HAZID Analysis",
    description: "Detailed hazard identification and analysis with intelligent processing.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-15%20010229-Nh4kSWGRPMats5rhQxSDxur689vnaK.png",
    features: [
      "Comprehensive hazard analysis",
      "Reference documentation",
      "Process validation",
      "Safety standards compliance",
    ],
  },
]

export function WorkflowShowcaseAction() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNext()
      }
    }, 8000)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    resetInterval()
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
    resetInterval()
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    resetInterval()
  }

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Experience the <span className="font-medium">Future</span> of Engineering
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how Solvi transforms complex engineering workflows into streamlined, intelligent processes
          </p>
        </div>

        <div className="relative w-full">
          {/* Screenshot Showcase */}
          <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-xl overflow-hidden">
            <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={screenshots[currentIndex].image || "/placeholder.svg"}
                  alt={screenshots[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-12">
                  <div className="max-w-3xl mx-auto text-white">
                    <motion.h3
                      className="text-2xl md:text-3xl font-medium mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {screenshots[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-slate-200 mb-6 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {screenshots[currentIndex].description}
                    </motion.p>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {screenshots[currentIndex].features.map((feature, index) => (
                        <span key={index} className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              onClick={handlePrev}
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              onClick={handleNext}
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`relative h-1 transition-all duration-500 ${
                  index === currentIndex ? "w-12 bg-slate-900" : "w-6 bg-slate-300"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-slate-900 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

