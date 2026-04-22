'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { use } from 'react'
import { pizzas } from '@/data/pizzas'
import { supplements } from '@/data/categories'
import { useCart } from '@/context/CartContext'
import { Size, Supplement } from '@/data/types'

function PizzaIconSmall({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="14" fill={color} />
      <line x1="18" y1="4" x2="18" y2="32" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="4" y1="18" x2="32" y2="18" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="8.1" y1="8.1" x2="27.9" y2="27.9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="27.9" y1="8.1" x2="8.1" y2="27.9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="12" cy="13" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="22" cy="12" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="18" cy="22" r="2" fill="white" fillOpacity="0.8" />
      <circle cx="18" cy="18" r="2.5" fill="white" fillOpacity="0.3" />
    </svg>
  )
}

function PizzaIconLarge({ color }: { color: string }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="22" fill={color} />
      <line x1="26" y1="4" x2="26" y2="48" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <line x1="4" y1="26" x2="48" y2="26" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <line x1="10.4" y1="10.4" x2="41.6" y2="41.6" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <line x1="41.6" y1="10.4" x2="10.4" y2="41.6" stroke="white" strokeWidth="1.4" strokeOpacity="0.5" />
      <circle cx="17" cy="18" r="2.8" fill="white" fillOpacity="0.8" />
      <circle cx="33" cy="16" r="2.8" fill="white" fillOpacity="0.8" />
      <circle cx="26" cy="33" r="2.8" fill="white" fillOpacity="0.8" />
      <circle cx="14" cy="30" r="2.2" fill="white" fillOpacity="0.6" />
      <circle cx="36" cy="32" r="2.2" fill="white" fillOpacity="0.6" />
      <circle cx="26" cy="26" r="3.5" fill="white" fillOpacity="0.25" />
    </svg>
  )
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const { addItem, totalItems } = useCart()

  const pizza = pizzas.find(p => p.slug === slug)

  const [size, setSize] = useState<Size>('Simple')
  const [quantity, setQuantity] = useState(1)
  const [supQty, setSupQty] = useState<Record<string, number>>({})
  const [added, setAdded] = useState(false)

  if (!pizza) {
    return (
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#FAF8F5' }}>
        <p style={{ fontSize: '40px' }}>🍕</p>
        <p style={{ fontWeight: '700', color: '#444', marginTop: '12px' }}>Pizza introuvable</p>
        <button onClick={() => router.back()} style={{ marginTop: '16px', color: '#E8430A', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Retour
        </button>
      </main>
    )
  }

  const addSup = (sup: Supplement) =>
    setSupQty(prev => ({ ...prev, [sup.id]: (prev[sup.id] ?? 0) + 1 }))

  const removeSup = (sup: Supplement) =>
    setSupQty(prev => {
      const next = { ...prev }
      if ((next[sup.id] ?? 0) <= 1) delete next[sup.id]
      else next[sup.id]--
      return next
    })

  const basePrice = size === 'Simple' ? pizza.priceSimple : (pizza.priceMega ?? pizza.priceSimple)
  const supplementsTotal = supplements.reduce((sum, s) => sum + (supQty[s.id] ?? 0) * s.price, 0)
  const unitPrice = basePrice + supplementsTotal
  const total = unitPrice * quantity

  const selectedSupplements: Supplement[] = supplements.flatMap(s =>
    Array(supQty[s.id] ?? 0).fill(s)
  )

  const handleAddToCart = () => {
    addItem(pizza, size, quantity, selectedSupplements)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* HERO IMAGE */}
      <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#FFF0EB' }}>
        <Image
          src={pizza.image.includes('placeholder') ? '/images/margarita.png' : pizza.image}
          alt={pizza.name}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain', padding: '20px', filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.28))' }}
          priority
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(to bottom, transparent, #FAF8F5)',
          pointerEvents: 'none',
        }} />

        {/* Bouton retour flottant — seul bouton en haut */}
        <button
          onClick={() => router.back()}
          style={{
            position: 'absolute', top: '16px', left: '16px',
            width: '42px', height: '42px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.92)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            fontSize: '22px', color: '#1A1A1A',
          }}
        >
          ‹
        </button>

        {pizza.badge && (
          <div style={{
            position: 'absolute', bottom: '28px', left: '16px',
            backgroundColor: pizza.badge === 'Best Seller' ? '#E8430A' : pizza.badge === 'Premium' ? '#C9A84C' : '#C0392B',
            color: 'white', fontSize: '11px', fontWeight: '700',
            padding: '5px 12px', borderRadius: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}>
            {pizza.badge === 'Best Seller' ? '⭐ Best Seller' : pizza.badge === 'Premium' ? '✦ Premium' : '🌶 Spicy'}
          </div>
        )}
      </div>

      {/* CARTE CONTENU */}
      <div style={{ backgroundColor: '#FAF8F5', borderRadius: '24px 24px 0 0', marginTop: '-20px', padding: '24px 16px 0' }}>

        {/* NOM + PRIX + DESCRIPTION */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1A1A1A', margin: 0, lineHeight: 1.2, flex: 1 }}>
              {pizza.name}
            </h1>
            <span style={{ fontSize: '22px', fontWeight: '900', color: '#E8430A', whiteSpace: 'nowrap', marginLeft: '12px', marginTop: '2px' }}>
              {pizza.priceSimple} DA
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.7', margin: '0 0 14px' }}>
            {pizza.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {pizza.ingredients.map(ing => (
              <span key={ing} style={{
                backgroundColor: 'white', color: '#666',
                fontSize: '11px', fontWeight: '600',
                padding: '4px 10px', borderRadius: '20px',
                border: '1px solid #EDEBE8',
              }}>
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#EDEBE8', margin: '0 -16px 20px' }} />

        {/* TAILLE — icônes flat design */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <p style={{ fontWeight: '800', fontSize: '15px', color: '#1A1A1A', margin: 0 }}>Choisir la taille</p>
            <span style={{ fontSize: '11px', color: '#E8430A', fontWeight: '700', backgroundColor: '#FFF0EB', padding: '3px 10px', borderRadius: '20px' }}>
              Obligatoire
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {(['Simple', 'Méga'] as Size[]).map(s => {
              const price = s === 'Simple' ? pizza.priceSimple : pizza.priceMega
              if (!price) return null
              const active = size === s
              const isPizzwich = pizza.category === 'Nos Pizzwich'
              const label = isPizzwich ? (s === 'Simple' ? 'L' : 'XL') : s
              const iconColor = active ? '#E8430A' : '#CCBFB8'
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    flex: 1, padding: '16px 10px', borderRadius: '16px',
                    border: active ? '2px solid #E8430A' : '2px solid #EDEBE8',
                    backgroundColor: active ? '#FFF0EB' : 'white',
                    cursor: 'pointer', textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  }}
                >
                  {s === 'Simple'
                    ? <PizzaIconSmall color={iconColor} />
                    : <PizzaIconLarge color={iconColor} />
                  }
                  <div style={{ fontSize: '13px', fontWeight: '700', color: active ? '#E8430A' : '#555' }}>{label}</div>
                  <div style={{ fontSize: '17px', fontWeight: '900', color: active ? '#E8430A' : '#1A1A1A' }}>{price} DA</div>
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#EDEBE8', margin: '0 -16px 20px' }} />

        {/* SUPPLÉMENTS — image + nom/prix + stepper */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <p style={{ fontWeight: '800', fontSize: '15px', color: '#1A1A1A', margin: 0 }}>Suppléments</p>
            <span style={{ fontSize: '11px', color: '#888', fontWeight: '600', backgroundColor: '#F0EFED', padding: '3px 10px', borderRadius: '20px' }}>
              Optionnel
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#AAA', margin: '0 0 14px' }}>Choisissez autant que vous voulez</p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {supplements.map((sup, i) => {
              const qty = supQty[sup.id] ?? 0
              const isLast = i === supplements.length - 1
              return (
                <div
                  key={sup.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '12px', paddingBottom: '12px',
                    borderBottom: isLast ? 'none' : '1px solid #F0EFED',
                    gap: '12px',
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0, borderRadius: '12px', overflow: 'hidden', backgroundColor: '#FFF8F5' }}>
                    <Image src={sup.image ?? ''} alt={sup.name} fill sizes="48px" style={{ objectFit: 'cover' }} />
                  </div>

                  {/* Nom + prix */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', margin: '0 0 2px' }}>
                      {sup.name}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#E8430A', margin: 0 }}>
                      +{sup.price} DA
                    </p>
                  </div>

                  {/* Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {qty > 0 && (
                      <>
                        <button
                          onClick={() => removeSup(sup)}
                          style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            backgroundColor: '#1A1A1A', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '20px', color: 'white', lineHeight: 1,
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', minWidth: '16px', textAlign: 'center' }}>
                          {qty}
                        </span>
                      </>
                    )}
                    <button
                      onClick={() => addSup(sup)}
                      style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        backgroundColor: '#E8430A', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '20px', color: 'white', lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#EDEBE8', margin: '0 -16px 28px' }} />

        {/* BOUTONS ACTION — dans le contenu, au-dessus de la barre panier */}
        <div style={{ paddingBottom: '20px' }}>
          {added ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => router.push('/menu')}
                style={{
                  flex: 1, padding: '16px',
                  backgroundColor: 'white', color: '#E8430A',
                  border: '2px solid #E8430A', borderRadius: '16px',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                }}
              >
                ← Continuer
              </button>
              <button
                onClick={() => router.push('/cart')}
                style={{
                  flex: 2, padding: '16px',
                  backgroundColor: '#E8430A', color: 'white',
                  border: 'none', borderRadius: '16px',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span>Voir le panier</span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '10px', padding: '4px 10px', fontSize: '14px', fontWeight: '900' }}>
                  🛒 {totalItems}
                </span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Stepper quantité */}
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F5F3F0', borderRadius: '14px', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: '44px', height: '52px', border: 'none', cursor: 'pointer',
                    backgroundColor: 'transparent', fontSize: '24px',
                    color: quantity === 1 ? '#CCC' : '#E8430A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A1A', minWidth: '28px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: '44px', height: '52px', border: 'none', cursor: 'pointer',
                    backgroundColor: 'transparent', fontSize: '24px', color: '#E8430A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, padding: '16px',
                  backgroundColor: '#E8430A', color: 'white',
                  border: 'none', borderRadius: '16px',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span>Ajouter au panier</span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '4px 12px', fontSize: '14px', fontWeight: '900' }}>
                  {total} DA
                </span>
              </button>
            </div>
          )}
        </div>

      </div>

    </main>
  )
}
