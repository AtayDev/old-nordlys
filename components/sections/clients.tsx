import { SectionHeading } from "@/components/ui/section-heading"

const clients = [
  { name: "TechChem Industries", logo: "/placeholder.svg?height=60&width=180" },
  { name: "ProcessFlow Solutions", logo: "/placeholder.svg?height=60&width=180" },
  { name: "ChemSynth Global", logo: "/placeholder.svg?height=60&width=180" },
  { name: "EngiChem Partners", logo: "/placeholder.svg?height=60&width=180" },
  { name: "Catalyst Innovations", logo: "/placeholder.svg?height=60&width=180" },
  { name: "Molecular Systems", logo: "/placeholder.svg?height=60&width=180" },
]

const testimonials = [
  {
    quote:
      "Solvi has transformed our process optimization workflow. What used to take days now takes hours, with more accurate results.",
    author: "Dr. Elena Petrov",
    title: "Chief Process Engineer",
    company: "TechChem Industries",
  },
  {
    quote:
      "The specialized AI agents understand our engineering challenges in a way no other software has before. It's like having an expert consultant available 24/7.",
    author: "Marcus Lindholm",
    title: "Operations Director",
    company: "ProcessFlow Solutions",
  },
  {
    quote:
      "The risk assessment capabilities have significantly improved our safety protocols while reducing the time spent on HAZOP studies by 60%.",
    author: "Sarah Chen",
    title: "Safety Manager",
    company: "ChemSynth Global",
  },
]

export function Clients() {
  return (
    <section id="clients" className="bg-slate-50 dark:bg-slate-800/30">
      <div className="section-container">
        <SectionHeading
          title="Trusted by Industry Leaders"
          subtitle="Our solutions are helping chemical and process engineering teams across the industry achieve unprecedented efficiency and accuracy."
          highlightWords={["Trusted"]}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mb-16">
          {clients.map((client, index) => (
            <div
              key={index}
              className="h-16 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="text-slate-600 dark:text-slate-400 mb-4 italic">"{testimonial.quote}"</blockquote>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-100">{testimonial.author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

