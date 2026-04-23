'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

const WHATSAPP_NUMBER = '213670074277'

type OrderType = 'emporter' | 'sur-place'
type TableType = 'famille' | 'seul'

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>['items'],
  total: number,
  orderType: OrderType,
  tableType: TableType | null
): string {
  const lines = items.map(item => {
    const price = item.size === 'Simple' ? item.pizza.priceSimple : (item.pizza.priceMega ?? item.pizza.priceSimple)
    const supsText = item.supplements.length > 0
      ? ` + ${item.supplements.map(s => s.name).join(', ')}`
      : ''
    const exclusionsText = item.excludedIngredients.length > 0
      ? ` — sans ${item.excludedIngredients.join(', ')}`
      : ''
    return `• ${item.quantity}x ${item.pizza.name} (${item.size}${supsText}${exclusionsText}) — ${price * item.quantity} DA`
  })

  const orderLine = orderType === 'emporter'
    ? '🥡 À emporter'
    : `🍽️ Sur place — ${tableType === 'famille' ? 'En famille' : 'Seul(e)'}`

  return encodeURIComponent(
    `Bonjour SO PIZZ 🍕\n\n${orderLine}\n\nJe souhaite commander :\n\n${lines.join('\n')}\n\n*Total : ${total} DA*\n\nMerci !`
  )
}

type OptionButtonProps = {
  active: boolean
  onClick: () => void
  icon: string
  label: string
  sub?: string
  color?: string
}

function OptionButton({ active, onClick, icon, label, sub, color = '#E8430A' }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: '14px 10px', borderRadius: '14px', cursor: 'pointer',
        border: active ? `2px solid ${color}` : '2px solid #F0EBE5',
        backgroundColor: active ? `${color}12` : 'white',
        textAlign: 'center', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '4px',
      }}
    >
      <span style={{ fontSize: '26px' }}>{icon}</span>
      <span style={{ fontSize: '13px', fontWeight: '800', color: active ? color : '#444' }}>{label}</span>
      {sub && <span style={{ fontSize: '11px', color: active ? color : '#AAA', fontWeight: '500' }}>{sub}</span>}
    </button>
  )
}

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  const [orderType, setOrderType] = useState<OrderType>('emporter')
  const [tableType, setTableType] = useState<TableType>('famille')

  const handleWhatsApp = () => {
    const msg = buildWhatsAppMessage(items, totalPrice, orderType, orderType === 'sur-place' ? tableType : null)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '140px' }}>

      {/* HEADER */}
      <header style={{
        backgroundColor: 'white', borderBottom: '1px solid #F0EBE5',
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px'
      }}>
        <button
          onClick={() => router.back()}
          style={{ all: 'unset', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#444' }}
        >
          ← Retour
        </button>
        <span style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>Mon panier</span>
        {items.length > 0 ? (
          <button onClick={clearCart} style={{ all: 'unset', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#CCC' }}>
            Vider
          </button>
        ) : (
          <div style={{ width: '40px' }} />
        )}
      </header>

      {/* PANIER VIDE */}
      {items.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</p>
          <p style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A1A', marginBottom: '8px' }}>Panier vide</p>
          <p style={{ fontSize: '13px', color: '#AAA', marginBottom: '28px' }}>Ajoutez des pizzas pour passer commande</p>
          <Link href="/menu">
            <button style={{ backgroundColor: '#E8430A', color: 'white', borderRadius: '50px', padding: '14px 32px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer' }}>
              Voir le menu →
            </button>
          </Link>
        </div>
      )}

      {items.length > 0 && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ARTICLES */}
          {items.map((item, index) => {
            const unitPrice = (item.size === 'Simple' ? item.pizza.priceSimple : (item.pizza.priceMega ?? item.pizza.priceSimple))
              + item.supplements.reduce((s, sup) => s + sup.price, 0)
            return (
              <div key={index} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '14px', border: '1px solid #F0EBE5', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative', width: '72px', height: '72px', flexShrink: 0, backgroundColor: '#FFF8F5', borderRadius: '12px' }}>
                  <Image
                    src={item.pizza.image.includes('placeholder') ? '/images/margarita.png' : item.pizza.image}
                    alt={item.pizza.name}
                    fill
                    sizes="72px"
                    style={{ objectFit: 'contain', padding: '6px', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '14px', color: '#1A1A1A', margin: '0 0 2px' }}>{item.pizza.name}</p>
                      <div style={{ display: 'inline-block', backgroundColor: item.size === 'Simple' ? '#FFAA80' : '#E8430A', borderRadius: '6px', padding: '2px 8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: 'white' }}>{item.size}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.pizza.id, item.size)} style={{ all: 'unset', cursor: 'pointer', color: '#DDD', fontSize: '18px', padding: '4px', lineHeight: 1 }}>×</button>
                  </div>
                  {item.supplements.length > 0 && (
                    <p style={{ fontSize: '11px', color: '#AAA', margin: '0 0 4px' }}>
                      + {item.supplements.map(s => s.name).join(', ')}
                    </p>
                  )}
                  {item.excludedIngredients.length > 0 && (
                    <p style={{ fontSize: '11px', color: '#E8430A', margin: '0 0 8px', fontWeight: '600' }}>
                      sans {item.excludedIngredients.join(', ')}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => updateQuantity(item.pizza.id, item.size, item.quantity - 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: item.quantity === 1 ? '#F5F5F5' : '#FFF0EB', border: 'none', cursor: 'pointer', color: item.quantity === 1 ? '#CCC' : '#E8430A', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >−</button>
                      <span style={{ fontWeight: '800', fontSize: '15px', color: '#1A1A1A', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.pizza.id, item.size, item.quantity + 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#FFF0EB', border: 'none', cursor: 'pointer', color: '#E8430A', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >+</button>
                    </div>
                    <span style={{ fontWeight: '800', fontSize: '15px', color: '#E8430A' }}>{unitPrice * item.quantity} DA</span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* TYPE DE COMMANDE */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5' }}>
            <p style={{ fontWeight: '800', fontSize: '14px', color: '#1A1A1A', marginBottom: '12px' }}>Comment souhaitez-vous commander ?</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <OptionButton active={orderType === 'emporter'} onClick={() => setOrderType('emporter')} icon="🥡" label="À emporter" />
              <OptionButton active={orderType === 'sur-place'} onClick={() => setOrderType('sur-place')} icon="🍽️" label="Sur place" />
            </div>
          </div>

          {/* SUR PLACE : EN FAMILLE OU SEUL */}
          {orderType === 'sur-place' && (
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5' }}>
              <p style={{ fontWeight: '800', fontSize: '14px', color: '#1A1A1A', marginBottom: '12px' }}>Vous êtes...</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <OptionButton active={tableType === 'famille'} onClick={() => setTableType('famille')} icon="👨‍👩‍👧" label="En famille" sub="Grande table" color="#27AE60" />
                <OptionButton active={tableType === 'seul'} onClick={() => setTableType('seul')} icon="🧍" label="Seul(e)" sub="Table individuelle" color="#2980B9" />
              </div>
            </div>
          )}

          {/* RÉCAPITULATIF */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>{totalItems} article{totalItems > 1 ? 's' : ''}</span>
              <span style={{ fontSize: '13px', color: '#888' }}>{totalPrice} DA</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Livraison</span>
              <span style={{ fontSize: '13px', color: '#27AE60', fontWeight: '700' }}>Gratuite 🛵</span>
            </div>
            <div style={{ borderTop: '1px solid #F0EBE5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#E8430A' }}>{totalPrice} DA</span>
            </div>
          </div>

        </div>
      )}

      {/* BOUTON WHATSAPP */}
      {items.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #F0EBE5', padding: '16px', zIndex: 10 }}>
          <button
            onClick={handleWhatsApp}
            style={{ width: '100%', padding: '16px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <span style={{ fontSize: '20px' }}>💬</span>
            <span>Commander via WhatsApp</span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '4px 12px', fontSize: '14px', fontWeight: '900' }}>
              {totalPrice} DA
            </span>
          </button>
        </div>
      )}

    </main>
  )
}
