export type Size = 'M' | 'L' | 'XL'

export type Badge = 'Best Seller' | 'Premium' | 'Spicy'

export interface Pizza {
  id: string
  slug: string
  name: string
  category: string
  description: string
  ingredients: string[]
  price: number
  sizes: Size[]
  badge?: Badge
  image: string
}

export interface CartItem {
  pizza: Pizza
  size: Size
  quantity: number
}

export type Category = 'Tous' | 'Base Tomate' | 'Base Crème'