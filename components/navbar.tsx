"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useCart } from "@/components/ui/cart-context"
import { Button } from "@/components/ui/button"
import CartModal from "@/components/ui/cart-modal"
import CheckOrderModal from "@/components/ui/check-order"

export default function Navbar() {
  const { cart } = useCart()
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const [isOpen, setIsOpen] = useState(false)        // Mobile Menu
  const [isCartOpen, setIsCartOpen] = useState(false) // Cart Modal
  const [checkOpen, setCheckOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false) // Tutup menu setelah klik
  }

  return (
    <nav className="fixed top-0 w-full bg-primary text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/logo.png" alt="Neat Shoecare Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection("home")} className="text-background hover:text-primary-light transition-colors duration-200">Beranda</button>
              <button onClick={() => scrollToSection("services")} className="text-background hover:text-primary-light transition-colors duration-200">Layanan</button>
              <button onClick={() => scrollToSection("testimoni")} className="text-background hover:text-primary-light transition-colors duration-200">Testimoni</button>
              <button onClick={() => setCheckOpen(true)} className="text-background hover:text-primary-light transition-colors duration-200">Cek Pesanan</button>

              <CheckOrderModal open={checkOpen} onOpenChange={setCheckOpen} />
              
              {/* Desktop Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white text-primary font-semibold px-4 py-1 rounded-full hover:bg-gray-100 transition"
              >
                Keranjang
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2">
                    {cartCount}
                  </span>
                )}
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
              <button onClick={() => scrollToSection("home")} className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200">Beranda</button>
              <button onClick={() => scrollToSection("products")} className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200">Layanan</button>
              <button onClick={() => scrollToSection("testimonials")} className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200">Testimoni</button>
              <button onClick={() => setCheckOpen(true)} className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200">Cek Pesanan</button>

              <CheckOrderModal open={checkOpen} onOpenChange={setCheckOpen} />
              
              {/* Mobile Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white text-primary font-semibold px-4 py-1 rounded-full hover:bg-gray-100 transition flex items-center"
              >
                Keranjang
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Modal Cart selalu tersedia */}
      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  )
}
