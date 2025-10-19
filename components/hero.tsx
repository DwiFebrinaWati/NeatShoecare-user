"use client"

import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
            Take Care of Your Shoes, <span className="text-primary">Trust Neat Shoecare</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Premium shoe care products designed to keep your footwear looking pristine. From leather polish to
            waterproof protection, we have everything you need.
          </p>

          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            View Products
          </Button>
        </div>
      </div>
    </section>
  )
}
