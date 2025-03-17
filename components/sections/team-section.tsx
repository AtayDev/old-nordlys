"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

const teamMembers = [
  {
    name: "Ayoub Frikhat",
    role: "Process & Chemical Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U0l71jPSqK5c7c3RRd29eBMQI0o3fY.png",
    expertise: "Process Engineering, Chemical Engineering, Carbon Capture Technologies",
    background:
      "M.Sc. in Chemical Engineering, M.Sc. in Process Engineering. Specialized in carbon capture technologies and sustainable process design.",
    importance:
      "Ayoub brings deep domain expertise and cutting-edge knowledge of the chemical industry to our AI solutions.",
  },
  {
    name: "Jabran Anadi",
    role: "AI & Software Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-afI8IBeQs7E557ABiNK4UaiR0ws4EM.png",
    expertise: "Web Development, Machine Learning, Software Engineering",
    background:
      "Engineer's Degree in Software Engineering. Experienced in developing machine learning models and data governance solutions.",
    importance:
      "Jabran drives the technical development of our AI ecosystem, building intelligent tools for engineers.",
  },
  {
    name: "Souraya Bellahcen",
    role: "Process & Chemical Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q9LuhYNLZamsQ60yqhkDRASkA0tIRk.png",
    expertise: "Chemical Engineering, Process Engineering, Heat Integration",
    background:
      "M.Sc. in Chemical Engineering, M.Sc. in Process Engineering. Specialized in process optimization and energy efficiency.",
    importance:
      "Souraya brings a wealth of knowledge in process optimization to our AI solutions, ensuring practical value.",
  },
  {
    name: "Salah-Eddine Alabouch",
    role: "AI & Data Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rqLa0Vn8HsvHvLI6VrtaDvoYk4RPYn.png",
    expertise: "Data Science, Generative AI, Machine Learning, Data Engineering",
    background:
      "M.Sc. in AI, Experienced consultant in Data/Generative AI. Specializes in leveraging AI to solve complex business challenges.",
    importance: "Salah-Eddine is a driving force in our Generative AI and Data Engineering projects.",
  },
]

const advisor = {
  name: "Olav Grønås Gjerde",
  role: "Senior Advisor and Mentor",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/olav.jpg-8yNowf6FUeMEaX8P5vycovg39yrLKX.jpeg",
  expertise: "Data Engineering, AI Strategy, Data Analytics",
  background:
    "Founder of IntelliStream AS, Co-Founder of boost.ai. A proven leader in AI with a deep background in data-driven solutions.",
  importance:
    "Olav brings invaluable strategic guidance and mentorship, ensuring that our technology is both innovative and impactful.",
}

export function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section id="team" ref={ref} className="relative py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-light mb-6 text-slate-900">
              Meet the <span className="font-medium text-blue-600">Team</span>
            </h2>
            <p className="text-lg text-slate-600">
              At Nordlys Tech, our strength lies in the diverse talents and deep expertise of our team. We're a
              passionate group of engineers and innovators, united by a mission to transform chemical and process
              engineering with AI.
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-20">
          <h3 className="text-2xl font-light mb-12 text-center text-slate-900">Our Cofounders</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedGradientBorder
                  borderWidth={2}
                  borderRadius={12}
                  glowEffect={true}
                  glowSize={10}
                  colors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
                  hoverEffect={true}
                >
                  <div className="p-6 bg-white rounded-lg">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-medium text-slate-900">{member.name}</h4>
                        <p className="text-blue-600 mb-3">{member.role}</p>

                        <div className="space-y-2">
                          <div>
                            <h5 className="text-sm font-medium text-slate-900">Expertise</h5>
                            <p className="text-sm text-slate-600">{member.expertise}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-slate-900">Background</h5>
                            <p className="text-sm text-slate-600">{member.background}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-slate-900">Impact</h5>
                            <p className="text-sm text-slate-600">{member.importance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedGradientBorder>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-light mb-8 text-center text-slate-900">Our Senior Advisor</h3>

            <AnimatedGradientBorder
              borderWidth={2}
              borderRadius={12}
              glowEffect={true}
              glowSize={10}
              colors={["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"]}
              hoverEffect={true}
            >
              <div className="p-6 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-medium text-slate-900">{advisor.name}</h4>
                    <p className="text-blue-600 mb-3">{advisor.role}</p>

                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-slate-900">Expertise</h5>
                        <p className="text-sm text-slate-600">{advisor.expertise}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-slate-900">Background</h5>
                        <p className="text-sm text-slate-600">{advisor.background}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-slate-900">Impact</h5>
                        <p className="text-sm text-slate-600">{advisor.importance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGradientBorder>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

