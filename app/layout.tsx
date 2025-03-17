import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Nordlys Tech - AI Solutions for Chemical Engineering",
  description: "Precision-engineered AI solutions for the chemical and process engineering industry",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-white text-neutral-900 antialiased`}>{children}</body>
    </html>
  )
}



import './globals.css'