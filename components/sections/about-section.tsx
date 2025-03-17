"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 -z-10"></div>

      <motion.div className="container mx-auto px-4 relative" style={{ opacity, scale }}>
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-light mb-12 text-center text-slate-900">
              About <span className="font-medium text-blue-600">Solvi</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-slate-600">
                At Nordlys Tech, we are developing Solvi, an advanced AI-driven eco-system that is redefining the future
                of chemical and process engineering. Our platform revolutionizes how engineers access and apply
                specialized knowledge.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-slate-600">
                We are a diverse Oslo-based startup, comprised of four young engineers, including two AI and Software
                Engineers, and two Process and Chemical Engineers. Notably, all of our team members have completed
                undergraduate programs in theoretical mathematics and physics, providing a strong foundation for our
                work.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-slate-600">
                We are focused on developing safe, explainable AI solutions for industrial applications based on high
                quality domain-specific data with the goal of augmenting chemical & process engineers workflow. Our
                journey is guided by Mr. Olav Grønås Gjerde, one of the Co-Founders of boost.ai, a trailblazer in
                practical AI applications in Scandinavia, who serves as our senior advisor and mentor.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-12">
              <MagneticButton
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
              >
                Meet Our Team
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  )
}

