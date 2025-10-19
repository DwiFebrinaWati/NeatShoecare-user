"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  onAddToSimulator?: (product: Product) => void
  isVisible?: boolean
}

export default function ProductCard({ product, onAddToSimulator, isVisible }: ProductCardProps) {
  const handleAdd = () => {
    onAddToSimulator?.(product)
    // Always dispatch a CustomEvent so the Price Simulator can listen globally
    // window.dispatchEvent(
    //   new CustomEvent("addToSimulator", {
    //     detail: { id: product.id, name: product.name, price: product.price },
    //   }),
    // )
  }

  return (
    <div
      data-product-id={product.id}
      className={`transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
    >
      <Card className="hover-scale h-full bg-card border-border">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl font-semibold text-foreground mb-2">{product.name}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4">{product.description}</CardDescription>
          <div className="text-2xl font-bold text-primary">${product.price}</div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            onClick={handleAdd}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
          >
            Add to Price Simulator
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
