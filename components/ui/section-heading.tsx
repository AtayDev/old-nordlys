import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
  subtitleClassName?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
  subtitleClassName = "",
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={cn("mb-16", alignmentClasses[align], className)}>
      <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">{title}</h2>
      {subtitle && (
        <p className={cn("text-lg text-neutral-600 text-balance max-w-2xl", subtitleClassName)}>Ready to transform your engineering workflow? <br/>Contact us to learn more about Solvi and how it can benefit your organization.</p>
      )}
    </div>
  )
}

