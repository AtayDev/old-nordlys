"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LaserFrame } from "@/components/ui/laser-frame";
import { Contact } from "@/components/sections/contact";
import { ArrowRight, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { PremiumCta } from "@/components/sections/premium-cta";

const devDetails = "Our process began with extensive work including collecting and processing large volumes of high quality domain-specific data, developing proprietary reasoning models, collaboration, and more. We gathered continuous feedback to understand what new challenges emerged with each implementation working alongside industrial experts from relevant domains.\nThe concept was straightforward yet powerful: an expert-designed and expert-tested engine would deliver maximum value in specialized environments. Our goal is creating AI solutions that can be implemented in a specialized, safe, and accessible manner for chemical and process engineers.";

// Journey data
const journeySteps = [
  {
    id: "idea",
    title: "Idea - Create Value, Clear the Clutter",
    description:
      "Nordlys Tech was founded with a clear mission: to empower chemical and process engineers by eliminating the clutter that consumes their day.",
    details:
      "Our team, a blend of chemical engineering and computer science expertise, saw firsthand how the clutter of complex data, repetitive tasks, and fragmented workflows was holding back innovation. This is where the idea of Solvi emerged to bring AI-driven intelligence into every stage of the engineering workflow.",
  },
  {
    id: "development",
    title: "Development",
    description:
      "Having found the root issues, we dedicated ourselves to developing Solvi over one year with strong scientific foundations.",
    details:
      "Our process began with extensive work including collecting and processing large volumes of high quality domain-specific data, developing proprietary reasoning models, collaboration, and more. We gathered continuous feedback to understand what new challenges emerged with each implementation working alongside industrial experts from relevant domains.\nThe concept was straightforward yet powerful: an expert-designed and expert-tested engine would deliver maximum value in specialized environments. Our goal is creating AI solutions that can be implemented in a specialized, safe, and accessible manner for chemical and process engineers.",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Now we're here, with Solvi almost ready to launch in beta! Our platform will streamline key engineering workflows through intuitive AI Co-Engineering, eliminating repetitive tasks and unlocking new levels of efficiency.",
    details:
      "We can't wait to bring the power of Solvi to engineers all over the globe, transforming how technical teams collaborate, innovate, and solve complex problems in their daily work.",
  },
];

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
];

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
];

const DecorativeElement = ({ className = "" }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="30" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="45" stroke="black" strokeWidth="2" />
      <circle cx="60" cy="60" r="60" stroke="black" strokeWidth="2" />
    </svg>
  </div>
);

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Interactive elements
  const [activeValue, setActiveValue] = useState<number | null>(null);

  // Timeline auto-play functionality
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 10000);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    resetTimeout();
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    stopAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => resetTimeout();
  }, [activeStep]);

  // Mouse follow effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();

      const x = clientX / width;
      const y = clientY / height;

      heroRef.current.style.setProperty("--mouse-x", x.toString());
      heroRef.current.style.setProperty("--mouse-y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

          <motion.div
            className="container-xl relative z-10"
            style={{ y, opacity }}
          >
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
                We're redefining the future of chemical and process engineering
                with advanced AI solutions.
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
                    e.preventDefault();
                    document.querySelector("#our-story")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
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
            onClick={() =>
              document
                .getElementById("our-story")
                ?.scrollIntoView({ behavior: "smooth" })
            }
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
                <div className="space-y-6" style={{ textAlign: "justify" }}>
                  <p className="text-lg text-neutral-600">
                    At Nordlys Tech, we're developing Solvi, an AI-driven
                    ecosystem that's transforming chemical and process
                    engineering. Our platform reimagines how engineers access
                    and utilize specialized knowledge with artificial
                    intelligence. This is just the beginning of our long-term
                    commitment to pioneering, Safe, Reliable, Cutting-Edge AI
                    Solutions including foundation models for the industry.
                  </p>
                  <p className="text-lg text-neutral-600">
                    We're a diverse Oslo-based startup founded by four young
                    engineers with ambitious goals. Our team is guided by some
                    of the most qualified advisors in the AI and energy sectors
                    across Scandinavia and worldwide.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <LaserFrame className="h-[400px] w-full">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src="/nordlys-logo-black.png?height=800&width=600"
                      alt="Nordlys Tech Team"
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      style={{ background: "border-box" }}
                    ></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white"></div>
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
                  <div
                    key={index}
                    className="relative pl-8 cursor-pointer"
                    onClick={() => handleStepClick(index)}
                  >
                    {/* Vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-300"></div>

                    {/* Step title */}
                    <h3 className="text-3xl text-neutral-700 mb-4">
                      Step {index + 1}: {step.title}
                    </h3>

                    {/* Step description */}
                    <p className="text-lg text-neutral-600 mb-6">
                      {step.description}
                    </p>

                    {/* Step details - with smoother transition */}
                    <div
                      className="overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{
                        maxHeight: activeStep === index ? "500px" : "0",
                        opacity: activeStep === index ? 1 : 0,
                        textAlign: "justify",
                        textJustify: "inter-word",
                        hyphens: "auto",
                      }}
                    >
                      <p className="text-neutral-600" style={{"whiteSpace": "pre-line"}}>{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-12 pl-8">
                <button
                  onClick={() =>
                    isAutoPlaying ? stopAutoPlay() : startAutoPlay()
                  }
                  className="text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
                >
                  {isAutoPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev + 1) % journeySteps.length);
                    stopAutoPlay();
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
                        <div
                          className="pt-2"
                          style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                            hyphens: "auto",
                          }}
                        >
                          <p className="text-neutral-600">
                            {value.description}
                          </p>
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
                      onClick={() =>
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
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
                        textAlign: "justify",
                        textJustify: "inter-word",
                        hyphens: "auto",
                      }}
                    >
                      <p className="text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <PremiumCta />
      </main>

      <Footer />
    </div>
  );
}
