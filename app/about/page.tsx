"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { LaserFrame } from "@/components/ui/laser-frame"
import { Contact } from "@/components/sections/contact"
import { ArrowRight, ChevronDown, ChevronUp, Plus } from "lucide-react"

// Journey data
const journeySteps = [
  {
    id: "idea",
    title: "Idea",
    description: "Nordlys Tech was founded with a vision to transform chemical engineering with AI.",
    details:
      "Our team of four engineers came together with a shared vision of revolutionizing the chemical engineering industry through advanced AI solutions. With backgrounds in both engineering and AI, we identified a significant gap in the market for specialized tools that truly understand the complexities of chemical processes.",
  },
  {
    id: "development",
    title: "Development",
    description: "Development of Solvi, our AI ecosystem for chemical and process engineers.",
    details:
      "We began developing Solvi, our flagship AI ecosystem designed specifically for chemical and process engineers. This involved extensive research, data collection, and collaboration with industry experts to ensure our solutions address real-world engineering challenges.",
  },
  {
    id: "launch",
    title: "Launch",
    description: "Official launch of Solvi, bringing specialized AI to engineering teams worldwide.",
    details:
      "The launch of Solvi marks a significant milestone in our journey. Our AI ecosystem is now helping engineering teams worldwide streamline their workflows, optimize processes, and make more informed decisions based on specialized knowledge and intelligent insights.",
  },
]

// FAQ data
const faqs = [
  {
    question: "What is Nordlys Tech?",
    answer:
      "Nordlys Tech is an Oslo-based startup developing Solvi, an advanced AI-driven ecosystem that is redefining the future of chemical and process engineering. Our platform revolutionizes how engineers access and apply specialized knowledge.",
  },
  {
    question: "Who is on the team?",
    answer:
      "Our diverse team consists of four young engineers, including two AI and Software Engineers, and two Process and Chemical Engineers. All team members have completed undergraduate programs in theoretical mathematics and physics, providing a strong foundation for our work.",
  },
  {
    question: "What is your approach to AI?",
    answer:
      "We focus on developing safe, explainable AI solutions for industrial applications based on high-quality domain-specific data. Our goal is to augment chemical & process engineers' workflow with intelligent tools that understand the complexities of their field.",
  },
  {
    question: "Who guides your journey?",
    answer:
      "Our journey is guided by Mr. Olav Grønås Gjerde, one of the Co-Founders of boost.ai, a trailblazer in practical AI applications in Scandinavia. As our senior advisor and mentor, he helps ensure our solutions meet the highest standards of innovation and practicality.",
  },
]

// Values data
const values = [
  {
    title: "Innovation",
    description:
      "Pushing the boundaries of what's possible with AI in engineering. We constantly explore new technologies and methodologies to create solutions that were previously unimaginable.",
  },
  {
    title: "Expertise",
    description:
      "Deep domain knowledge in chemical and process engineering. Our team combines specialized engineering knowledge with cutting-edge AI expertise to create truly intelligent solutions.",
  },
  {
    title: "Safety",
    description:
      "Commitment to safe and explainable AI solutions. We design our AI systems with robust guardrails, ensuring reliable, accurate outputs through safe and explainable reasoning.",
  },
  {
    title: "Collaboration",
    description:
      "Working closely with engineers to solve real-world problems. We believe that the best solutions emerge from close collaboration between AI experts and domain specialists.",
  },
]

const DecorativeElement = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="30" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="45" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="60" stroke="black" strokeWidth="2" />
    </svg>
  </div>
)

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Interactive elements
  const [activeValue, setActiveValue] = useState<number | null>(null)

  // Timeline auto-play functionality
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const startAutoPlay = () => {
    setIsAutoPlaying(true)
    resetTimeout()

    timeoutRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length)
    }, 10000)
  }

  const stopAutoPlay = () => {
    setIsAutoPlaying(false)
    resetTimeout()
  }

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    stopAutoPlay()
  }

  useEffect(() => {
    startAutoPlay()
    return () => resetTimeout()
  }, [activeStep])

  // Mouse follow effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height } = heroRef.current.getBoundingClientRect()

      const x = clientX / width
      const y = clientY / height

      heroRef.current.style.setProperty("--mouse-x", x.toString())
      heroRef.current.style.setProperty("--mouse-y", y.toString())
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-cream"
          style={
            {
              "--mouse-x": "0.5",
              "--mouse-y": "0.5",
            } as React.CSSProperties
          }
        >
          {/* Subtle gradient background that follows mouse */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), #000, transparent 50%)",
            }}
          />

          {/* Grid pattern background */}
          <div className="absolute inset-0 grid-pattern opacity-70 pointer-events-none"></div>

          <motion.div className="container-xl relative z-10" style={{ y, opacity }}>
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-7xl font-light tracking-tight mb-8"
              >
                About <span className="font-medium">Nordlys Tech</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-neutral-600 mb-8"
              >
                We're redefining the future of chemical and process engineering with advanced AI solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="#our-story"
                  className="button-primary group hover-lift"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector("#our-story")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }}
                >
                  Discover Our Story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={() => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ChevronDown className="w-6 h-6 text-slate-600 animate-bounce" />
          </motion.div>
        </section>

        {/* Our Story Section */}
        <section id="our-story" className="py-24 bg-white">
          <div className="container-xl">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
                Our <span className="font-medium">Story</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="space-y-6">
                  <p className="text-lg text-neutral-600">
                    At Nordlys Tech, we are developing Solvi, an advanced AI-driven eco-system that is redefining the
                    future of chemical and process engineering. Our platform revolutionizes how engineers access and
                    apply specialized knowledge.
                  </p>
                  <p className="text-lg text-neutral-600">
                    We are a diverse Oslo-based startup, comprised of four young engineers with strong backgrounds in
                    theoretical mathematics and physics, providing a solid foundation for our work in developing
                    cutting-edge AI solutions.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <LaserFrame className="h-[400px] w-full">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=800&width=600"
                      alt="Nordlys Tech Team"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl font-medium mb-2">The Nordlys Team</h3>
                      <p>Combining expertise in AI and chemical engineering</p>
                    </div>
                  </div>
                </LaserFrame>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Journey Section - Styled like the workflow process */}
        <section className="py-32 bg-cream">
          <div className="container-xl">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
                Our <span className="font-medium">Journey</span>
              </h2>
            </ScrollReveal>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-16">
                {journeySteps.map((step, index) => (
                  <div key={index} className="relative pl-8 cursor-pointer" onClick={() => handleStepClick(index)}>
                    {/* Vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-300"></div>

                    {/* Step title */}
                    <h3 className="text-3xl text-neutral-700 mb-4">
                      Step {index + 1}: {step.title}
                    </h3>

                    {/* Step description */}
                    <p className="text-lg text-neutral-600 mb-6">{step.description}</p>

                    {/* Step details - with smoother transition */}
                    <div
                      className="overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{
                        maxHeight: activeStep === index ? "500px" : "0",
                        opacity: activeStep === index ? 1 : 0,
                      }}
                    >
                      <p className="text-neutral-600">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-12 pl-8">
                <button
                  onClick={() => (isAutoPlaying ? stopAutoPlay() : startAutoPlay())}
                  className="text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                >
                  {isAutoPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev + 1) % journeySteps.length)
                    stopAutoPlay()
                  }}
                  className="flex items-center text-neutral-900 hover:text-neutral-700 transition-colors duration-300 group"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Smoother animations */}
        <section className="py-24 bg-white">
          <div className="container-xl">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
                Our <span className="font-medium">Values</span>
              </h2>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {values.map((value, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setActiveValue(index)}
                      onMouseLeave={() => setActiveValue(null)}
                    >
                      <h3 className="text-2xl md:text-3xl font-medium mb-4 pb-2 border-b-2 border-neutral-900 inline-block">
                        {value.title}
                      </h3>

                      <div
                        className="overflow-hidden"
                        style={{
                          maxHeight: activeValue === index ? "200px" : "0px",
                          opacity: activeValue === index ? 1 : 0,
                          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        <div className="pt-2">
                          <p className="text-neutral-600">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Premium redesign */}
        <section className="py-24 bg-cream">
          <div className="container-xl">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
                <span className="font-medium">Questions</span> & Answers
              </h2>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="mb-8 border-b border-neutral-200 pb-8 last:border-b-0 last:pb-0">
                    <button
                      className="w-full flex justify-between items-center text-left group"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <h3 className="text-2xl font-light text-neutral-900 group-hover:text-neutral-700 transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center group-hover:border-neutral-900 transition-colors">
                        {expandedFaq === index ? (
                          <ChevronUp className="w-4 h-4 text-neutral-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-neutral-600" />
                        )}
                      </div>
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: expandedFaq === index ? "200px" : "0px",
                        opacity: expandedFaq === index ? 1 : 0,
                        marginTop: expandedFaq === index ? "16px" : "0px",
                      }}
                    >
                      <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Wider blue background */}
        <section className="py-24 bg-cream">
          <div className="w-full max-w-[95%] mx-auto">
            <ScrollReveal>
              <div className="relative bg-blue-50 p-16 md:p-24 lg:p-32 overflow-hidden">
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
                  <div className="md:max-w-4xl text-left">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight text-slate-900 mb-6">
                      Ready to transform your engineering workflow.
                      <br />
                      <span className="font-medium">Work will never be the same.</span>
                    </h2>
                  </div>

                  <div className="mt-8 md:mt-0">
                    <button
                      onClick={() => setShowContact(true)}
                      className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-medium rounded-none hover:bg-slate-800 transition-all duration-300 group"
                    >
                      Get in Touch
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
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

