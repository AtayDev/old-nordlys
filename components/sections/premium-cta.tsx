"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Contact } from "./contact"

const DecorativeElement = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="30" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="45" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="60" stroke="black" strokeWidth="2" />
    </svg>
  </div>
)

export function PremiumCta() {
  const [showContact, setShowContact] = useState(false)

  return (
    <section id="premiumCta" className="py-32 bg-cream">
      <div className="max-w-[95%] mx-auto">
        <div className="relative bg-blue-50 p-24 overflow-hidden">
          {/* Decorative Elements */}
          <DecorativeElement className="top-0 right-0 opacity-10" />

          {/* Moroccan Tile Pattern */}
          <div className="absolute bottom-0 left-0 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H50V50H0V0Z" fill="black" />
              <path d="M50 0H100V50H50V0Z" fill="black" />
              <path d="M100 0H150V50H100V0Z" fill="black" />
              <path d="M150 0H200V50H150V0Z" fill="black" />
              <path d="M0 50H50V100H0V50Z" fill="black" />
              <path d="M50 50H100V100H50V50Z" fill="white" />
              <path d="M100 50H150V100H100V50Z" fill="white" />
              <path d="M150 50H200V100H150V50Z" fill="black" />
              <path d="M0 100H50V150H0V100Z" fill="black" />
              <path d="M50 100H100V150H50V100Z" fill="white" />
              <path d="M100 100H150V150H100V100Z" fill="white" />
              <path d="M150 100H200V150H150V100Z" fill="black" />
              <path d="M0 150H50V200H0V150Z" fill="black" />
              <path d="M50 150H100V200H50V150Z" fill="black" />
              <path d="M100 150H150V200H100V150Z" fill="black" />
              <path d="M150 150H200V200H150V150Z" fill="black" />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10"
          >
            <div className="md:max-w-3xl text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-6">
                Meet a collaborative AI for chemical engineers.
                <br />
                <span className="font-medium">Work will never be the same.</span>
              </h2>
            </div>

            <div className="mt-8 md:mt-0">
              <button
                onClick={() => setShowContact(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-medium rounded-none hover:bg-slate-800 transition-all duration-300 group"
              >
                Request Early Access
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Sliding Contact Form */}
        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden bg-cream"
            >
              <div className="pt-8 max-w-4xl mx-auto">
                <Contact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

