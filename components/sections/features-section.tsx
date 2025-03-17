"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Brain, Zap, BarChart, FileText, Lightbulb, ShieldCheck } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"

const features = [
  {
    title: "Knowledge AI Agents",
    description: "AI-powered systems designed to comprehend and analyze complex engineering principles.",
    icon: Brain,
    color: "#3b82f6",
  },
  {
    title: "Action AI Agents",
    description: "Task-oriented AI models that execute domain-specific engineering tasks with precision.",
    icon: Zap,
    color: "#8b5cf6",
  },
  {
    title: "Advanced Dynamic AI Solvers",
    description: "Real-time, numerical and analytical adaptive solutions for complex engineering challenges.",
    icon: BarChart,
    color: "#ec4899",
  },
  {
    title: "Tailored Report Generation",
    description:
      "AI agents that transform data into actionable insights for engineers, operators, and decision makers.",
    icon: FileText,
    color: "#10b981",
  },
  {
    title: "Safe & Explainable AI",
    description:
      "Our AI systems are designed with robust guardrails, ensuring reliable, accurate outputs through safe and explainable reasoning.",
    icon: ShieldCheck,
    color: "#f59e0b",
  },
  {
    title: "Maximize Value",
    description:
      "Our AI agents synthesize specialized knowledge to provide actionable recommendations that empower engineering teams.",
    icon: Lightbulb,
    color: "#6366f1",
  },
]

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section id="features" ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10"
        style={{ y: backgroundY }}
      />

      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-light mb-6 text-slate-900">
              Powered by <span className="font-medium text-blue-600">Advanced AI</span>
            </h2>
            <p className="text-lg text-slate-600">
              Experience the next generation of chemical process engineering with our AI-driven ecosystem
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "up" : "down"}>
              <ParallaxSection speed={0.2} direction={index % 2 === 0 ? "up" : "down"} className="h-full">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full hover:shadow-md transition-shadow duration-300 group">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}10` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </ParallaxSection>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

