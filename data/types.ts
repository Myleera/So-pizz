export type Size = 'Simple' | 'Méga'

export type Badge = 'Best Seller' | 'Premium' | 'Spicy' | 'Nouveau'

export type Category =
  | 'Tous'
  | 'Base Tomate'
  | 'Base Crème'
  | 'Nos Pizzwich'
  | 'Nos Pâtes'
  | 'Nos Salades'
  | 'Nos Desserts'
  | 'Nos Boissons'

export interface Supplement {
  id: string
  name: string
  price: number
  image?: string
}

export interface Pizza {
  id: string
  slug: string
  name: string
  category: string
  description: string
  ingredients: string[]
  priceSimple: number
  priceMega?: number
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

export interface MegaDeal {
  id: string
  name: string
  subtitle: string
  price: number
  image: string
}
