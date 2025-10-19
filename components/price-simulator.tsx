"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"

interface SimulatorItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function PriceSimulator() {
  const [items, setItems] = useState<SimulatorItem[]>([])
  const [total, setTotal] = useState(0)
  const [animateTotal, setAnimateTotal] = useState(false)

  const formatMoney = (n: number) => `$${n.toFixed(2)}`

  // Listen for products added from catalog
  useEffect(() => {
    const handleAddProduct = (event: CustomEvent) => {
      const product = event.detail
      setItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id)
        if (existingItem) {
          return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        }
        return [...prev, { ...product, quantity: 1 }]
      })
    }

    window.addEventListener("addToSimulator", handleAddProduct as EventListener)
    return () => window.removeEventListener("addToSimulator", handleAddProduct as EventListener)
  }, [])

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
    setAnimateTotal(true)
    const timer = setTimeout(() => setAnimateTotal(false), 300)
    return () => clearTimeout(timer)
  }, [items])

  const updateQuantity = (id: number, change: number) => {
    setItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQuantity = Math.max(0, item.quantity + change)
              return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
            }
            return item
          })
          .filter(Boolean) as SimulatorItem[],
    )
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section id="simulator" className="py-20 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Price Simulator</h2>
          <p className="text-lg text-muted-foreground">Calculate the total cost of your shoe care essentials</p>
        </div>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <div className="flex items-baseline justify-between">
              <CardTitle className="text-2xl text-foreground font-title">Your Cart</CardTitle>
              <div className={`text-lg font-semibold text-primary ${animateTotal ? "animate-count-up" : ""}`}>
                {formatMoney(total)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products added yet. Add products from the catalog above!
                </p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground">{formatMoney(item.price)} each</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="font-semibold text-foreground w-8 text-center">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="text-right min-w-[80px]">
                        <span className="font-bold text-foreground">{formatMoney(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-foreground">Total:</span>
                    <span className={`text-3xl font-bold text-primary ${animateTotal ? "animate-count-up" : ""}`}>
                      {formatMoney(total)}
                    </span>
                  </div>

                  {(() => {
                    const waNumberRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
                    const waNumber = waNumberRaw.replace(/[^\d]/g, "") // keep only digits

                    const message = [
                      "Halo, saya ingin memesan produk berikut:",
                      ...items.map((i) => `- ${i.name} x ${i.quantity} = ${formatMoney(i.price * i.quantity)}`),
                      `Total: ${formatMoney(total)}`,
                    ].join("\n")

                    const waUrl =
                      waNumber && items.length > 0
                        ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
                        : undefined

                    return (
                      <div className="mt-6">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-600/90 text-white"
                          disabled={!waNumber || items.length === 0}
                          onClick={() => {
                            if (waUrl) window.open(waUrl, "_blank", "noopener,noreferrer")
                          }}
                          title={
                            !waNumber
                              ? "Tambahkan nomor WhatsApp penjual di Vars: NEXT_PUBLIC_WHATSAPP_NUMBER"
                              : items.length === 0
                                ? "Keranjang masih kosong"
                                : "Chat penjual via WhatsApp"
                          }
                        >
                          Chat via WhatsApp
                        </Button>
                      </div>
                    )
                  })()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
