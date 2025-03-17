"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [organization, setOrganization] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")
      setOrganization("")
      setComment("")
    }, 1500)
  }

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 -z-10"></div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <AnimatedGradientBorder
              borderWidth={3}
              borderRadius={16}
              glowEffect={true}
              glowSize={20}
              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
            >
              <div className="p-8 md:p-12 bg-white rounded-lg">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
                      Ready to Transform Your Engineering Workflow?
                    </h2>
                    <p className="text-lg text-slate-600">
                      Join the waitlist for early access to Solvi and be among the first to experience the future of
                      engineering.
                    </p>

                    <div className="hidden lg:block">
                      <motion.div
                        className="relative w-full h-64"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
                        <div
                          className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <div
                          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-500 rounded-full opacity-10 animate-pulse"
                          style={{ animationDelay: "1s" }}
                        ></div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {isSubmitted ? (
                      <motion.div
                        className="h-full flex flex-col items-center justify-center text-center p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-8 h-8 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-medium text-slate-900 mb-2">Thank You!</h3>
                        <p className="text-slate-600">
                          Your request has been submitted. We'll be in touch soon with more information about early
                          access to Solvi.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-1">
                            Organization
                          </label>
                          <input
                            id="organization"
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            placeholder="Organization name"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-1">
                            Comment (optional)
                          </label>
                          <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Leave a comment (optional)"
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>

                        <div className="pt-2">
                          <MagneticButton
                            as="button"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Processing...
                              </div>
                            ) : (
                              "Join Waitlist"
                            )}
                          </MagneticButton>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedGradientBorder>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

