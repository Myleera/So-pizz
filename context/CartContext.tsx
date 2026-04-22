'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Pizza, Size, Supplement } from '@/data/types'

interface CartContextType {
  items: CartItem[]
  addItem: (pizza: Pizza, size: Size, quantity: number, supplements: Supplement[]) => void
  removeItem: (pizzaId: string, size: Size) => void
  updateQuantity: (pizzaId: string, size: Size, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (pizza: Pizza, size: Size, quantity: number, supplements: Supplement[]) => {
    setItems(prev => {
      const existing = prev.find(i => i.pizza.id === pizza.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.pizza.id === pizza.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { pizza, size, quantity, supplements }]
    })
  }

  const removeItem = (pizzaId: string, size: Size) => {
    setItems(prev => prev.filter(i => !(i.pizza.id === pizzaId && i.size === size)))
  }

  const updateQuantity = (pizzaId: string, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeItem(pizzaId, size)
      return
    }
    setItems(prev =>
      prev.map(i =>
        i.pizza.id === pizzaId && i.size === size ? { ...i, quantity } : i
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => {
    const pizzaPrice = i.size === 'Simple' ? i.pizza.priceSimple : (i.pizza.priceMega ?? i.pizza.priceSimple)
    const supplementsPrice = i.supplements.reduce((s, sup) => s + sup.price, 0)
    return sum + (pizzaPrice + supplementsPrice) * i.quantity
  }, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity,
      clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}