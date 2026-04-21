export type Size = 'Simple' | 'Méga'

export type Badge = 'Best Seller' | 'Premium' | 'Spicy'

export interface Supplement {
  id: string
  name: string
  price: number
}

export interface Pizza {
  id: string
  slug: string
  name: string
  category: string
  description: string
  ingredients: string[]
  priceSimple: number
  priceMega: number
  sizes: Size[]
  badge?: Badge
  image: string
}

export interface CartItem {
  pizza: Pizza
  size: Size
  quantity: number
  supplements: Supplement[]
}

export type Category = 'Tous' | 'Base Tomate' | 'Base Crème'