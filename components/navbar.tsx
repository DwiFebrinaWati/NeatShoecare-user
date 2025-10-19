"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">Neat Shoecare</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("simulator")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Price Simulator
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("simulator")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Price Simulator
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
