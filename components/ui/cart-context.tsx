"use client"

import { createContext, useContext, useState, useEffect } from "react"

type CartItem = {
  notes: any
  id: string
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  clearCart: () => void
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // 📌 Load dari localStorage saat pertama kali
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      setCart(JSON.parse(saved))
    }
  }, [])

  // 📌 Simpan ke localStorage setiap cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Tambah ke keranjang
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  // Hapus
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Update jumlah
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: quantity < 1 ? 1 : quantity } : i
      )
    )
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
