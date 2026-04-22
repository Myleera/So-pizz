import { Category, MegaDeal } from './types'

export const categories: Category[] = [
  'Tous',
  'Base Tomate',
  'Base Crème',
  'Nos Pizzwich',
  'Nos Pâtes',
  'Nos Salades',
  'Nos Desserts',
  'Nos Boissons',
]

export const categoryMeta: Record<string, { icon: string; color: string; image: string }> = {
  'Base Tomate':  { icon: '🍅', color: '#E8430A', image: '/images/cat-nos-pizzas-tomate.png' },
  'Base Crème':   { icon: '🥛', color: '#C9A84C', image: '/images/cat-nos-pizzas-creme.png' },
  'Nos Pizzwich': { icon: '🥪', color: '#27AE60', image: '/images/cat-nos-pizzouichs.png' },
  'Nos Pâtes':    { icon: '🍝', color: '#8E44AD', image: '/images/cat-nos-pates.png' },
  'Nos Salades':  { icon: '🥗', color: '#16A085', image: '/images/cat-nos-salades.png' },
  'Nos Desserts': { icon: '🍮', color: '#E67E22', image: '/images/cat-nos-desserts.png' },
  'Nos Boissons': { icon: '🥤', color: '#2980B9', image: '/images/cat-nos-boissons.png' },
}

export const supplements = [
  { id: 's1', name: 'Oeuf',          price: 50,  image: '/images/oeuf.png' },
  { id: 's2', name: 'Légumes',       price: 50,  image: '/images/legumes.png' },
  { id: 's3', name: 'Viande',        price: 200, image: '/images/viande.png' },
  { id: 's4', name: 'Fromage',       price: 200, image: '/images/fromage.png' },
  { id: 's5', name: 'Crème fraîche', price: 100, image: '/images/cremefraiche.png' },
]

export const megaDeals: MegaDeal[] = [
  {
    id: 'duo',
    name: 'Méga Duo',
    subtitle: '2 pizzas Méga',
    price: 2490,
    image: '/images/pizza-mega-duo.png',
  },
  {
    id: 'trio',
    name: 'Méga Trio',
    subtitle: '3 pizzas Méga',
    price: 2690,
    image: '/images/pizza-mega-trio.png',
  },
  {
    id: 'quatro',
    name: 'Méga Quatro',
    subtitle: '4 pizzas Méga',
    price: 2890,
    image: '/images/pizza-mega-quatro.png',
  },
]
