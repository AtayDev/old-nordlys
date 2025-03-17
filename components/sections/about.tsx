"use client"

import { useRef, useEffect } from "react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            textRef.current.classList.add("fade-in-up")
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
    <section id="about" ref={sectionRef} className="section-padding bg-cream">
      <div className="container-lg">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-light mb-6">About Nordlys Tech</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We are developing Solvi, an advanced AI-driven ecosystem that is redefining the future of chemical and
            process engineering.
          </p>

          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-cream px-6 text-sm text-neutral-500 uppercase tracking-widest">Our Story</span>
            </div>
          </div>
        </div>

        <div ref={textRef} className="opacity-0">
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-lg text-neutral-600">
              At Nordlys Tech, we are developing Solvi, an advanced AI-driven eco-system that is redefining the future
              of chemical and process engineering. Our platform revolutionizes how engineers access and apply
              specialized knowledge, making complex engineering tasks more efficient and accurate.
            </p>

            <p className="text-lg text-neutral-600">
              We are a diverse Oslo-based startup, comprised of four young engineers, including two AI and Software
              Engineers, and two Process and Chemical Engineers. Notably, all of our team members have completed
              undergraduate programs in theoretical mathematics and physics, providing a strong foundation for our work
              in developing cutting-edge AI solutions.
            </p>

            <p className="text-lg text-neutral-600">
              Our focus is on developing safe, explainable AI solutions for industrial applications based on high
              quality domain-specific data. We aim to augment chemical & process engineers' workflow with intelligent
              tools that understand the complexities of their field.
            </p>

            <p className="text-lg text-neutral-600">
              Our journey is guided by Mr. Olav Grønås Gjerde, one of the Co-Founders of boost.ai, a trailblazer in
              practical AI applications in Scandinavia. As our senior advisor and mentor, he helps ensure our solutions
              meet the highest standards of innovation and practicality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

