"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Premium Shoe Cleaner",
    description: "Deep cleaning formula for all shoe materials",
    price: 24.99,
    image: "/premium-shoe-cleaner-bottle.jpg",
  },
  {
    id: 2,
    name: "Leather Polish",
    description: "Nourishing polish for leather shoes and boots",
    price: 18.99,
    image: "/leather-polish-container.jpg",
  },
  {
    id: 3,
    name: "Waterproof Spray",
    description: "Advanced protection against water and stains",
    price: 22.99,
    image: "/waterproof-spray-bottle.jpg",
  },
  {
    id: 4,
    name: "Sneaker Wipes",
    description: "Convenient cleaning wipes for quick touch-ups",
    price: 12.99,
    image: "/sneaker-cleaning-wipes-pack.jpg",
  },
  {
    id: 5,
    name: "Suede Brush",
    description: "Specialized brush for suede and nubuck materials",
    price: 15.99,
    image: "/suede-cleaning-brush.jpg",
  },
  {
    id: 6,
    name: "Shoe Deodorizer",
    description: "Eliminate odors and keep shoes fresh",
    price: 16.99,
    image: "/shoe-deodorizer-spray.jpg",
  },
]

interface ProductCatalogProps {
  onAddToSimulator?: (product: (typeof products)[0]) => void
}

export default function ProductCatalog({ onAddToSimulator }: ProductCatalogProps) {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = Number.parseInt(entry.target.getAttribute("data-product-id") || "0")
            setVisibleProducts((prev) => [...prev, productId])
          }
        })
      },
      { threshold: 0.1 },
    )

    const productElements = document.querySelectorAll("[data-product-id]")
    productElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleAddToSimulator = (product: (typeof products)[0]) => {
    const { id, name, price } = product
    window.dispatchEvent(new CustomEvent("addToSimulator", { detail: { id, name, price } }))
    // Optionally still call upstream handler if provided
    onAddToSimulator?.(product)
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Premium Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of professional-grade shoe care products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToSimulator={handleAddToSimulator}
              isVisible={visibleProducts.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
