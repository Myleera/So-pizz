'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { CartItem, Pizza, Size } from '@/data/types'

// Ce fichier gère le panier dans toute l'application

interface CartContextType {
  items: CartItem[]
  addItem: (pizza: Pizza, size: Size, quantity: number) => void
  removeItem: (pizzaId: string, size: Size) => void
  updateQuantity: (pizzaId: string, size: Size, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (pizza: Pizza, size: Size, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.pizza.id === pizza.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.pizza.id === pizza.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { pizza, size, quantity }]
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
  const totalPrice = items.reduce((sum, i) => sum + i.pizza.price * i.quantity, 0)

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