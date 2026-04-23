'use client'

import React, { useState } from 'react'
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
    const supsText = item.supplements.filter(s => s.id !== 'flavor').length > 0
      ? ` + ${item.supplements.filter(s => s.id !== 'flavor').map(s => s.name).join(', ')}`
      : ''
    const flavorSup = item.supplements.find(s => s.id === 'flavor')
    const flavorText = flavorSup ? ` — ${flavorSup.name}` : ''
    const exclusionsText = item.excludedIngredients.length > 0
      ? ` — sans ${item.excludedIngredients.join(', ')}`
      : ''
    return `• ${item.quantity}x ${item.pizza.name} (${item.size}${supsText}${flavorText}${exclusionsText}) — ${price * item.quantity} DA`
  })

  const orderLine = orderType === 'emporter'
    ? '🥡 À emporter'
    : `🍽️ Sur place — ${tableType === 'famille' ? 'En famille' : 'Seul(e)'}`

  return encodeURIComponent(
    `Bonjour SO PIZZ 🍕\n\n${orderLine}\n\nJe souhaite commander :\n\n${lines.join('\n')}\n\n*Total : ${total} DA*\n\nMerci !`
  )
}

function IconEmporter({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="8" y="13" width="16" height="14" rx="3" fill={color} />
      <path d="M11 13V10C11 7.79 13.24 6 16 6C18.76 6 21 7.79 21 10V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="17" width="6" height="2" rx="1" fill="white" />
      <path d="M12 6H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function IconSurPlace({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="24" width="24" height="2.5" rx="1.25" fill={color} />
      <rect x="14" y="14" width="4" height="10" rx="1" fill={color} />
      <path d="M8 8V14C8 16.21 11.58 18 16 18C20.42 18 24 16.21 24 14V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconFamille({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="11" cy="9" r="3.5" fill={color} />
      <circle cx="21" cy="9" r="3.5" fill={color} />
      <path d="M4 24C4 19.58 7.13 16 11 16C14.87 16 18 19.58 18 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 24C14 19.58 17.13 16 21 16C24.87 16 28 19.58 28 24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconSeul({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="10" r="5" fill={color} />
      <path d="M6 26C6 20.48 10.48 16 16 16C21.52 16 26 20.48 26 26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

type OptionButtonProps = {
  active: boolean
  onClick: () => void
  Icon: React.FC<{ color: string }>
  label: string
  sub?: string
  color?: string
}

function OptionButton({ active, onClick, Icon, label, sub, color = '#E8430A' }: OptionButtonProps) {
  const c = active ? color : '#BBBBBB'
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: '16px 10px', borderRadius: '16px', cursor: 'pointer',
        border: active ? `2px solid ${color}` : '2px solid #F0EBE5',
        backgroundColor: active ? `${color}12` : 'white',
        textAlign: 'center', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '6px',
      }}
    >
      <Icon color={c} />
      <span style={{ fontSize: '13px', fontWeight: '800', color: active ? color : '#888' }}>{label}</span>
      {sub && <span style={{ fontSize: '11px', color: active ? color : '#BBB', fontWeight: '500' }}>{sub}</span>}
    </button>
  )
}

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  const [orderType, setOrderType] = useState<OrderType>('emporter')
  const [tableType, setTableType] = useState<TableType>('famille')
  const [showRecap, setShowRecap] = useState(false)

  const confirmAndSendWhatsApp = () => {
    const msg = buildWhatsAppMessage(items, totalPrice, orderType, orderType === 'sur-place' ? tableType : null)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  /* ─── ÉCRAN DE CONFIRMATION ──────────────────── */
  if (showRecap) {
    const orderLabel = orderType === 'emporter'
      ? '🥡 À emporter'
      : `🍽️ Sur place — ${tableType === 'famille' ? 'En famille' : 'Seul(e)'}`

    return (
      <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '140px' }}>

        {/* HEADER */}
        <header style={{
          backgroundColor: 'white', borderBottom: '1px solid #F0EBE5',
          position: 'sticky', top: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
        }}>
          <button
            onClick={() => setShowRecap(false)}
            style={{ all: 'unset', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#444' }}
          >
            ← Modifier
          </button>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>Confirmer ma commande</span>
          <div style={{ width: '60px' }} />
        </header>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* TYPE DE COMMANDE */}
          <div style={{
            backgroundColor: '#FFF0EB', borderRadius: '14px', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '22px' }}>{orderType === 'emporter' ? '🥡' : '🍽️'}</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#E8430A' }}>{orderLabel}</span>
          </div>

          {/* LISTE DES ARTICLES */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #F0EBE5', overflow: 'hidden' }}>
            <p style={{ fontWeight: '800', fontSize: '13px', color: '#888', margin: 0, padding: '14px 16px 10px', borderBottom: '1px solid #F8F6F3' }}>
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </p>
            {items.map((item, index) => {
              const unitPrice = (item.size === 'Simple' ? item.pizza.priceSimple : (item.pizza.priceMega ?? item.pizza.priceSimple))
                + item.supplements.reduce((s, sup) => s + sup.price, 0)
              const isLast = index === items.length - 1
              const visibleSups = item.supplements.filter(s => s.id !== 'flavor')
              const flavorSup = item.supplements.find(s => s.id === 'flavor')
              return (
                <div key={index} style={{
                  padding: '14px 16px',
                  borderBottom: isLast ? 'none' : '1px solid #F8F6F3',
                  display: 'flex', gap: '12px', alignItems: 'center',
                }}>
                  <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0, backgroundColor: '#FFF8F5', borderRadius: '10px' }}>
                    <Image
                      src={item.pizza.image.includes('placeholder') ? '/images/margarita.png' : item.pizza.image}
                      alt={item.pizza.name} fill sizes="56px"
                      style={{ objectFit: 'contain', padding: '6px', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <p style={{ fontWeight: '700', fontSize: '14px', color: '#1A1A1A', margin: '0 0 4px' }}>
                        {item.quantity}× {item.pizza.name}
                      </p>
                      <span style={{ fontWeight: '800', fontSize: '14px', color: '#E8430A', marginLeft: '8px', flexShrink: 0 }}>
                        {unitPrice * item.quantity} DA
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: visibleSups.length || flavorSup || item.excludedIngredients.length ? '4px' : 0 }}>
                      <span style={{
                        fontSize: '10px', fontWeight: '700', color: 'white',
                        backgroundColor: item.size === 'Simple' ? '#FFAA80' : '#E8430A',
                        borderRadius: '5px', padding: '2px 7px',
                      }}>{item.size}</span>
                    </div>
                    {visibleSups.length > 0 && (
                      <p style={{ fontSize: '11px', color: '#AAA', margin: '2px 0 0' }}>
                        + {visibleSups.map(s => s.name).join(', ')}
                      </p>
                    )}
                    {flavorSup && (
                      <p style={{ fontSize: '11px', color: '#888', margin: '2px 0 0', fontWeight: '600' }}>
                        {flavorSup.name}
                      </p>
                    )}
                    {item.excludedIngredients.length > 0 && (
                      <p style={{ fontSize: '11px', color: '#E8430A', margin: '2px 0 0', fontWeight: '600' }}>
                        sans {item.excludedIngredients.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* TOTAL */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Sous-total</span>
              <span style={{ fontSize: '13px', color: '#888' }}>{totalPrice} DA</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Livraison</span>
              <span style={{ fontSize: '13px', color: '#27AE60', fontWeight: '700' }}>Gratuite 🛵</span>
            </div>
            <div style={{ borderTop: '1px solid #F0EBE5', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>Total à payer</span>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#E8430A' }}>{totalPrice} DA</span>
            </div>
          </div>

        </div>

        {/* BOUTONS FIXES */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #F0EBE5', padding: '12px 16px', zIndex: 10, display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowRecap(false)}
            style={{
              flex: 1, padding: '16px', backgroundColor: 'white', color: '#444',
              border: '2px solid #EDEBE8', borderRadius: '16px',
              fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            }}
          >
            ← Modifier
          </button>
          <button
            onClick={confirmAndSendWhatsApp}
            style={{
              flex: 2, padding: '16px', backgroundColor: '#25D366', color: 'white',
              border: 'none', borderRadius: '16px',
              fontSize: '15px', fontWeight: '800', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <span>💬</span>
            <span>Confirmer et envoyer</span>
          </button>
        </div>

      </main>
    )
  }

  /* ─── PANIER NORMAL ──────────────────────────── */
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
                    alt={item.pizza.name} fill sizes="72px"
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
                  {item.supplements.filter(s => s.id !== 'flavor').length > 0 && (
                    <p style={{ fontSize: '11px', color: '#AAA', margin: '0 0 4px' }}>
                      + {item.supplements.filter(s => s.id !== 'flavor').map(s => s.name).join(', ')}
                    </p>
                  )}
                  {item.supplements.find(s => s.id === 'flavor') && (
                    <p style={{ fontSize: '11px', color: '#888', margin: '0 0 4px', fontWeight: '600' }}>
                      {item.supplements.find(s => s.id === 'flavor')!.name}
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
              <OptionButton active={orderType === 'emporter'} onClick={() => setOrderType('emporter')} Icon={IconEmporter} label="À emporter" />
              <OptionButton active={orderType === 'sur-place'} onClick={() => setOrderType('sur-place')} Icon={IconSurPlace} label="Sur place" />
            </div>
          </div>

          {/* SUR PLACE */}
          {orderType === 'sur-place' && (
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5' }}>
              <p style={{ fontWeight: '800', fontSize: '14px', color: '#1A1A1A', marginBottom: '12px' }}>Vous êtes...</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <OptionButton active={tableType === 'famille'} onClick={() => setTableType('famille')} Icon={IconFamille} label="En famille" sub="Grande table" color="#27AE60" />
                <OptionButton active={tableType === 'seul'} onClick={() => setTableType('seul')} Icon={IconSeul} label="Seul(e)" sub="Table individuelle" color="#2980B9" />
              </div>
            </div>
          )}

          {/* TOTAL */}
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

      {/* BOUTON VERS RÉCAPITULATIF */}
      {items.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTop: '1px solid #F0EBE5', padding: '16px', zIndex: 10 }}>
          <button
            onClick={() => setShowRecap(true)}
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
