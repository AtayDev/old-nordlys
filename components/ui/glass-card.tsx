import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string
  children: React.ReactNode
}

export function GlassCard({
  className,
  glowColor = "rgba(59, 130, 246, 0.1)", // Default blue glow
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border bg-background/50 p-1 backdrop-blur-xl", className)}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

