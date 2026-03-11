"use client"

import { useState } from "react"
import { useCart } from "@/components/ui/cart-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus } from "lucide-react"
import CheckoutModal from "@/components/ui/checkout-modal"

export default function CartModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Keranjang</DialogTitle>
        </DialogHeader>

        {/* CART LIST */}
        <div className="flex flex-col gap-4 mt-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              Keranjang masih kosong 😔
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-3 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString("id-ID")},-
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="rounded-full border"
                  >
                    <Minus size={14} />
                  </Button>

                  <span className="font-medium w-5 text-center">{item.quantity}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full border"
                  >
                    <Plus size={14} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>

                  <span className="font-semibold w-20 text-right">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")},-
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="my-4" />

        {/* TOTAL */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="text-primary text-2xl font-bold">
            Rp {totalPrice.toLocaleString("id-ID")},-
          </span>
        </div>

        <Button
          onClick={() => setCheckoutOpen(true)}
          disabled={cart.length === 0}
          className={`mt-4 w-full font-semibold py-3 rounded-xl text-white 
            ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
        >
          Buat Pesanan
        </Button>

        <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
      </DialogContent>
    </Dialog>
  )
}