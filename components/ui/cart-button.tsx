"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/ui/cart-context"

export default function CartButton({ onClick }: { onClick?: () => void }) {
  const { cart } = useCart()
  const totalItems = cart.reduce((n, item) => n + item.quantity, 0)

  return (
    <button onClick={onClick} className="relative">
      <ShoppingCart size={26} />

      {totalItems > 0 && (
        <span className="
          absolute -top-2 -right-2 bg-red-600 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center
        ">
          {totalItems}
        </span>
      )}
    </button>
  )
}
