import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { League_Spartan } from "next/font/google"
import localFont from "next/font/local"

const league = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
})

const introRust = localFont({
  src: "../public/fonts/IntroRust.otf", // upload your font file here
  variable: "--font-intro-rust",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Neat Shoecare - Premium Shoe Care Products",
  description:
    "Take care of your shoes with Neat Shoecare premium products. Professional-grade cleaners, polishes, and protection for all your footwear."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${league.variable} ${introRust.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
