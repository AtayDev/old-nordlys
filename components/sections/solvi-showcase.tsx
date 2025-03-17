"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Beaker, Activity, Gauge, Brain, Workflow, ChevronRight, FileText, Zap } from "lucide-react"
import { PremiumCard } from "@/components/ui/premium-card"
import { Button } from "@/components/ui/button"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const useCases = [
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

export function SolviShowcase() {
  return (
    <section className="premium-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="premium-showcase-heading">
          <h2 className="premium-showcase-title">
            Solvi <span className="font-medium">MetaBrain</span>
          </h2>
          <p className="premium-showcase-subtitle">
            Connect every element of your engineering workflow to build a dynamic knowledge ecosystem. Solvi AI
            transforms it into actionable insights — a second brain for your engineering team.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="premium-showcase-grid"
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={item}>
              <PremiumCard className="h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="inline-flex p-2 rounded-lg bg-blue-50 mb-4">
                    <useCase.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="premium-showcase-card-title">{useCase.title}</h3>
                  <p className="premium-showcase-card-description">{useCase.description}</p>
                  <div className="premium-showcase-example mt-auto">
                    <p>"{useCase.example}"</p>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="premium-showcase-heading mt-20">
          <h3 className="heading-md mb-4">
            How It <span className="font-medium">Works</span>
          </h3>
          <p className="body-md text-slate-600 mb-8">
            Transform complex engineering challenges into streamlined solutions with our intelligent workflow
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="premium-workflow"
        >
          <motion.div variants={item} className="md:col-span-2">
            <PremiumCard className="h-full">
              <div className="p-6 h-full">
                <div className="inline-flex p-2 rounded-lg bg-blue-50 mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="premium-workflow-title">Specialized AI Agents</h3>
                <p className="premium-workflow-description">
                  Access a team of AI experts, each trained in specific engineering disciplines to provide accurate,
                  context-aware solutions.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">Reaction Engineering</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">Process Safety</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">Separation Technologies</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">Process Control</p>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
          <motion.div variants={item}>
            <PremiumCard className="h-full">
              <div className="p-6 h-full">
                <div className="inline-flex p-2 rounded-lg bg-blue-50 mb-4">
                  <Workflow className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="premium-workflow-title">Intelligent Workflow</h3>
                <p className="premium-workflow-description">
                  Seamlessly integrate AI-driven insights into your engineering processes for optimized decision-making.
                </p>
                <ul className="premium-workflow-list">
                  <li className="premium-workflow-item">
                    <div className="premium-workflow-dot" />
                    <span>Tag relevant experts</span>
                  </li>
                  <li className="premium-workflow-item">
                    <div className="premium-workflow-dot" />
                    <span>Receive detailed analysis</span>
                  </li>
                  <li className="premium-workflow-item">
                    <div className="premium-workflow-dot" />
                    <span>Generate documentation</span>
                  </li>
                </ul>
              </div>
            </PremiumCard>
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="text-center mt-12">
          <Button
            size="lg"
            className="group"
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Experience Solvi Today
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

