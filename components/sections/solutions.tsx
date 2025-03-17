"use client"

import { useRef, useEffect } from "react"
import { Beaker, AlertTriangle, Activity, Gauge, FileText, Zap } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const solutions = [
  {
    title: "Process Optimization",
    description: "Optimize distillation column parameters for cost-effective purity achievement",
    icon: Beaker,
    example: "What is the most cost-effective way to achieve 99.5% product purity in this distillation column?",
  },
  {
    title: "Risk Assessment",
    description: "Generate comprehensive HAZOP studies and risk assessments for new reactor units",
    icon: AlertTriangle,
    example: "Conduct a HAZOP analysis for our new reactor unit focusing on temperature deviations",
  },
  {
    title: "Process Control",
    description: "Implement robust control strategies for precise temperature maintenance",
    icon: Activity,
    example: "Design a cascade control system for maintaining reactor temperature within ±0.5°C",
  },
  {
    title: "Performance Analysis",
    description: "Monitor and optimize plant-wide performance, including equipment health",
    icon: Gauge,
    example: "What is the projected downtime impact of running this pump beyond design conditions?",
  },
  {
    title: "Report Generation",
    description: "Automatically create professional documentation for engineering processes",
    icon: FileText,
    example: "Generate a detailed LOPA (Layer of Protection Analysis) report for our critical process units",
  },
  {
    title: "Reaction Engineering",
    description: "Optimize reactor design and reaction conditions for maximum yield",
    icon: Zap,
    example: "What are the optimal reaction conditions to maximize the yield of our target product?",
  },
]

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardsRef.current) {
            cardsRef.current.classList.add("fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="solutions" ref={sectionRef} className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          title="AI Solutions for Chemical Engineering"
          subtitle="Our specialized AI agents are designed to solve complex engineering challenges with precision and reliability."
        />

        <div ref={cardsRef} className="opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {solutions.map((solution, index) => (
              <div key={index} className="group hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-neutral-100 rounded-sm">
                    <solution.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{solution.title}</h3>
                    <p className="text-neutral-600 mb-4">{solution.description}</p>
                    <div className="bg-neutral-50 p-4 border-l-2 border-neutral-900">
                      <p className="text-sm text-neutral-600 italic">"{solution.example}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

