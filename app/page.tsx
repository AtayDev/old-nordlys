"use client"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Solutions } from "@/components/sections/solutions"
import { Team } from "@/components/sections/team"
import { Contact } from "@/components/sections/contact"
import { WorkflowShowcase } from "@/components/sections/workflow-showcase"
import { PremiumCta } from "@/components/sections/premium-cta"
import { WorkflowShowcaseMiddle } from "@/components/sections/workflow-showcase-middle"
import { WorkflowShowcaseLast } from "@/components/sections/workflow-showcase-last"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
       <link rel="icon" type="image/png" href="/nordlys-favicon.png" />
      </Head>
      <Navigation />

      <main className="flex-1">
        <Hero />
        <WorkflowShowcase/>
        <WorkflowShowcaseMiddle/>
        <WorkflowShowcaseLast/>
        <PremiumCta />
      </main>

      <Footer />
    </div>
  )
}

