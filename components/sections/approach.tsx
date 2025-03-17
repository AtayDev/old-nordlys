"use client"

import { useState } from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Workflow, Database, Shield } from "lucide-react"

const approaches = [
  {
    id: "specialized",
    title: "Specialized AI Agents",
    icon: Brain,
    description:
      "Our AI agents are specialized in specific engineering disciplines, providing deep expertise in areas like reaction engineering, process safety, and separation technologies.",
    benefits: [
      "Domain-specific knowledge and reasoning",
      "Contextual understanding of engineering problems",
      "Ability to handle complex technical queries",
      "Continuous learning from new research and data",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "workflow",
    title: "Intelligent Workflow",
    icon: Workflow,
    description:
      "Seamlessly integrate AI-driven insights into your engineering processes for optimized decision-making and improved efficiency.",
    benefits: [
      "Streamlined engineering processes",
      "Reduced time-to-solution for complex problems",
      "Automated documentation and reporting",
      "Collaborative problem-solving environment",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "data",
    title: "High-Quality Data",
    icon: Database,
    description:
      "Our solutions are built on high-quality, domain-specific data that ensures accuracy and reliability in every recommendation.",
    benefits: [
      "Curated engineering datasets",
      "Validated against industry standards",
      "Regularly updated with new research",
      "Comprehensive coverage of chemical processes",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "safety",
    title: "Safe & Explainable AI",
    icon: Shield,
    description:
      "Our AI systems are designed with robust guardrails, ensuring reliable, accurate outputs through safe and explainable reasoning.",
    benefits: [
      "Transparent decision-making processes",
      "Verifiable recommendations",
      "Built-in safety constraints",
      "Audit trails for critical decisions",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function Approach() {
  const [activeTab, setActiveTab] = useState("specialized")

  return (
    <section id="approach" className="bg-white dark:bg-slate-900">
      <div className="section-container">
        <SectionHeading
          title="Our Technical Approach"
          subtitle="We combine advanced AI technologies with deep domain expertise to create solutions that truly understand and solve engineering challenges."
          highlightWords={["Technical Approach"]}
        />

        <Tabs defaultValue="specialized" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent mb-8">
            {approaches.map((approach) => (
              <TabsTrigger
                key={approach.id}
                value={approach.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:bg-primary dark:data-[state=active]:text-white"
              >
                <div className="flex items-center">
                  <approach.icon className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">{approach.title}</span>
                  <span className="md:hidden">{approach.title.split(" ")[0]}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {approaches.map((approach) => (
            <TabsContent key={approach.id} value={approach.id} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-medium mb-4 text-gradient">{approach.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{approach.description}</p>

                  <h4 className="text-lg font-medium mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {approach.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                  <Image
                    src={approach.image || "/placeholder.svg"}
                    alt={approach.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 grid-pattern opacity-50" />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

