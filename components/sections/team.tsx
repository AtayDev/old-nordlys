"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"

const teamMembers = [
  {
    name: "Ayoub Frikhat",
    role: "Process & Chemical Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-U0l71jPSqK5c7c3RRd29eBMQI0o3fY.png",
    expertise: "Process Engineering, Chemical Engineering, Carbon Capture Technologies",
    background:
      "M.Sc. in Chemical Engineering, M.Sc. in Process Engineering. Specialized in carbon capture technologies and sustainable process design.",
  },
  {
    name: "Jabran Anadi",
    role: "AI & Software Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-afI8IBeQs7E557ABiNK4UaiR0ws4EM.png",
    expertise: "Web Development, Machine Learning, Software Engineering",
    background:
      "Engineer's Degree in Software Engineering. Experienced in developing machine learning models and data governance solutions.",
  },
  {
    name: "Souraya Bellahcen",
    role: "Process & Chemical Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q9LuhYNLZamsQ60yqhkDRASkA0tIRk.png",
    expertise: "Chemical Engineering, Process Engineering, Heat Integration",
    background:
      "M.Sc. in Chemical Engineering, M.Sc. in Process Engineering. Specialized in process optimization and energy efficiency.",
  },
  {
    name: "Salah-Eddine Alabouch",
    role: "AI & Data Engineering Lead",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rqLa0Vn8HsvHvLI6VrtaDvoYk4RPYn.png",
    expertise: "Data Science, Generative AI, Machine Learning, Data Engineering",
    background:
      "M.Sc. in AI, Experienced consultant in Data/Generative AI. Specializes in leveraging AI to solve complex business challenges.",
  },
]

const advisor = {
  name: "Olav Grønås Gjerde",
  role: "Senior Advisor and Mentor",
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/olav.jpg-8yNowf6FUeMEaX8P5vycovg39yrLKX.jpeg",
  expertise: "Data Engineering, AI Strategy, Data Analytics",
  background:
    "Founder of IntelliStream AS, Co-Founder of boost.ai. A proven leader in AI with a deep background in data-driven solutions.",
}

export function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const advisorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === teamRef.current && teamRef.current) {
              teamRef.current.classList.add("fade-in-up")
            } else if (entry.target === advisorRef.current && advisorRef.current) {
              advisorRef.current.classList.add("fade-in-up")
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    if (teamRef.current) {
      observer.observe(teamRef.current)
    }

    if (advisorRef.current) {
      observer.observe(advisorRef.current)
    }

    return () => {
      if (teamRef.current) {
        observer.unobserve(teamRef.current)
      }
      if (advisorRef.current) {
        observer.unobserve(advisorRef.current)
      }
    }
  }, [])

  return (
    <section id="team" ref={sectionRef} className="section-padding bg-neutral-50">
      <div className="container-lg">
        <SectionHeading
          title="Expert Team"
          subtitle="Our team combines deep expertise in chemical engineering with cutting-edge AI development skills to create solutions that truly understand industry challenges."
        />

        <div ref={teamRef} className="opacity-0 mb-24">
          <h3 className="text-2xl font-light mb-12">Our Cofounders</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="hover-lift">
                <div className="aspect-square relative mb-6 bg-neutral-100">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="text-xl font-medium mb-1">{member.name}</h4>
                <p className="text-neutral-900 text-sm mb-4">{member.role}</p>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-neutral-900">Expertise</h5>
                    <p className="text-sm text-neutral-600">{member.expertise}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-neutral-900">Background</h5>
                    <p className="text-sm text-neutral-600">{member.background}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={advisorRef} className="opacity-0">
          <h3 className="text-2xl font-light mb-12">Our Senior Advisor</h3>

          <div className="flex flex-col md:flex-row gap-8 max-w-3xl">
            <div className="md:w-1/3 aspect-square relative bg-neutral-100">
              <Image src={advisor.image || "/placeholder.svg"} alt={advisor.name} fill className="object-cover" />
            </div>
            <div className="md:w-2/3">
              <h4 className="text-xl font-medium mb-1">{advisor.name}</h4>
              <p className="text-neutral-900 text-sm mb-4">{advisor.role}</p>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-neutral-900">Expertise</h5>
                  <p className="text-sm text-neutral-600">{advisor.expertise}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-neutral-900">Background</h5>
                  <p className="text-sm text-neutral-600">{advisor.background}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

