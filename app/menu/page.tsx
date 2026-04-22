'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { pizzas } from '@/data/pizzas'
import { categoryMeta, megaDeals } from '@/data/categories'
import { useCart } from '@/context/CartContext'
import { Category, Pizza } from '@/data/types'

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'Best Seller': { bg: '#E8430A', color: 'white' },
  'Premium':     { bg: '#C9A84C', color: 'white' },
  'Spicy':       { bg: '#C0392B', color: 'white' },
  'Nouveau':     { bg: '#27AE60', color: 'white' },
}

const allSections: { key: Category; label: string }[] = [
  { key: 'Base Tomate',  label: 'Base Tomate' },
  { key: 'Base Crème',   label: 'Base Crème' },
  { key: 'Nos Pizzwich', label: 'Nos Pizzwich' },
  { key: 'Nos Pâtes',    label: 'Nos Pâtes' },
  { key: 'Nos Salades',  label: 'Nos Salades' },
  { key: 'Nos Desserts', label: 'Nos Desserts' },
  { key: 'Nos Boissons', label: 'Nos Boissons' },
]

function PizzaCard({ pizza }: { pizza: Pizza }) {
  const isPizzwich = pizza.category === 'Nos Pizzwich'
  const isSimplePrice = !pizza.priceMega

  return (
    <Link href={`/product/${pizza.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #F0EBE5', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', backgroundColor: '#FFF8F5' }}>
          <Image src={pizza.image} alt={pizza.name} fill sizes="(min-width:768px) 280px, 50vw"
            style={{ objectFit: 'contain', padding: '12px', filter: 'drop-shadow(0px 10px 14px rgba(0,0,0,0.35))' }} />
          {pizza.badge && (
            <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: BADGE_STYLES[pizza.badge].bg, color: BADGE_STYLES[pizza.badge].color, fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px' }}>
              {pizza.badge}
            </div>
          )}
        </div>
        <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: '900', fontSize: '14px', color: '#1A1A1A', marginBottom: '4px', textTransform: 'uppercase', textAlign: 'center' }}>{pizza.name}</p>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {pizza.description}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
              <div style={{ backgroundColor: '#FFAA80', borderRadius: '6px', padding: '4px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '8px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>{isPizzwich ? 'L' : isSimplePrice ? 'PRIX' : 'SIMPLE'}</div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'white', lineHeight: 1.2 }}>{pizza.priceSimple} DA</div>
              </div>
              {pizza.priceMega && (
                <div style={{ backgroundColor: '#E8430A', borderRadius: '6px', padding: '4px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '8px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.5px' }}>{isPizzwich ? 'XL' : 'MÉGA'}</div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'white', lineHeight: 1.2 }}>{pizza.priceMega} DA</div>
                </div>
              )}
            </div>
            <div style={{ backgroundColor: '#E8430A', borderRadius: '8px', padding: '6px 10px' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>+</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [showMega, setShowMega] = useState(false)
  useCart()

  const selectedSection = activeCategory ? allSections.find(s => s.key === activeCategory) : null
  const itemsToShow = activeCategory ? pizzas.filter(p => p.category === activeCategory) : []

  const buildMegaWhatsApp = (deal: typeof megaDeals[0]) => {
    const msg = encodeURIComponent(`Bonjour SO PIZZ 🍕\n\nJe souhaite commander : *${deal.name}* (${deal.subtitle}) à *${deal.price} DA*\n\nMes pizzas choisies :\n1. \n2. ${deal.id !== 'duo' ? '\n3. ' : ''}${deal.id === 'quatro' ? '\n4. ' : ''}\n\nMerci !`)
    window.open(`https://wa.me/213670074277?text=${msg}`, '_blank')
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <div className="menu-wrapper">

        {/* BANNIÈRE */}
        <Image src="/images/banniere.png" alt="SO PIZZ" width={1920} height={650} sizes="100vw"
          style={{ width: '100%', height: 'auto', display: 'block' }} priority />

        {/* VUE ACCUEIL MENU */}
        {!activeCategory && !showMega && (
          <div style={{ paddingBottom: '32px' }}>

            {/* SECTION MÉGA */}
            <div style={{ padding: '24px 16px 12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#E8430A', textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.3px' }}>
                PIZZAS MÉGA — OFFRES SPÉCIALES
              </h2>
              {/* mega-grid : flex sur mobile, grid 3 col sur desktop */}
              <div className="mega-grid" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {megaDeals.map(deal => (
                  <button key={deal.id} onClick={() => buildMegaWhatsApp(deal)} className="mega-card" style={{ all: 'unset', cursor: 'pointer', flexShrink: 0, backgroundColor: 'white', border: '2px solid #FFCDB8', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '160px', boxShadow: '0 4px 16px rgba(232,67,10,0.1)' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
                      <Image src={deal.image} alt={deal.name} fill sizes="160px"
                        style={{ objectFit: 'contain' }} />
                    </div>
                    <div style={{ padding: '8px 10px 12px' }}>
                      <p style={{ fontWeight: '900', fontSize: '14px', color: '#E8430A', margin: 0 }}>{deal.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* GRILLE CATÉGORIES */}
            <div style={{ padding: '8px 16px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A1A', marginBottom: '16px' }}>Notre menu</h1>
              <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                {/* 1. Base Tomate */}
                <button onClick={() => setActiveCategory('Base Tomate')} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #F0EBE5', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <Image src={categoryMeta['Base Tomate'].image} alt="Base Tomate" fill sizes="(min-width:768px) 280px, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                    <p style={{ fontWeight: '800', fontSize: '13px', color: '#1A1A1A', margin: 0 }}>Base Tomate</p>
                  </div>
                </button>

                {/* 2. Pizzas Méga */}
                <button onClick={() => setShowMega(true)} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px', overflow: 'hidden', border: '2px solid #FFCDB8', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(232,67,10,0.12)' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <Image src="/images/cat-pizzas-megas.png" alt="Pizzas Méga" fill sizes="(min-width:768px) 280px, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                    <p style={{ fontWeight: '800', fontSize: '13px', color: '#E8430A', margin: 0 }}>Pizzas Méga</p>
                  </div>
                </button>

                {/* 3. Reste */}
                {allSections.filter(s => s.key !== 'Base Tomate').map(({ key, label }) => (
                  <button key={key} onClick={() => setActiveCategory(key)} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #F0EBE5', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                      <Image src={categoryMeta[key].image} alt={label} fill sizes="(min-width:768px) 280px, 50vw" style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                      <p style={{ fontWeight: '800', fontSize: '13px', color: '#1A1A1A', margin: 0 }}>{label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div style={{ padding: '32px 16px 120px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#E8430A', marginBottom: '16px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Suivez-nous sur nos réseaux
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <a href="https://www.instagram.com/sopizz_dz" target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFF5F2', borderRadius: '12px', padding: '12px 18px', border: '1px solid #FFCDB8' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="#E8430A" />
                    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
                  </svg>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#E8430A' }}>@sopizz_dz</span>
                </a>
                <a href="https://www.facebook.com/sopizz.dz" target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFF5F2', borderRadius: '12px', padding: '12px 18px', border: '1px solid #FFCDB8' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#E8430A" />
                    <path d="M13.5 8H15V6H13C11.9 6 11 6.9 11 8V10H9V12H11V18H13V12H14.7L15 10H13V8.5C13 8.22 13.22 8 13.5 8Z" fill="white" />
                  </svg>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#E8430A' }}>@sopizz_dz</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* VUE PIZZAS MÉGA */}
        {showMega && (
          <div style={{ padding: '16px 16px 120px' }}>
            <button onClick={() => setShowMega(false)} style={{ all: 'unset', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '16px', display: 'block' }}>
              ← Retour au menu
            </button>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#E8430A', textAlign: 'center', marginBottom: '20px' }}>PIZZAS MÉGA</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {megaDeals.map(deal => (
                <button key={deal.id} onClick={() => buildMegaWhatsApp(deal)} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', border: '2px solid #FFCDB8', borderRadius: '18px', overflow: 'hidden', display: 'flex', alignItems: 'stretch', boxShadow: '0 4px 16px rgba(232,67,10,0.1)' }}>
                  <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
                    <Image src={deal.image} alt={deal.name} fill sizes="140px" style={{ objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <p style={{ fontWeight: '900', fontSize: '20px', color: '#E8430A', margin: 0 }}>{deal.name}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* PIZZAS DISPONIBLES POUR LES MÉGA */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #F0EBE5', marginBottom: '16px' }}>
              <p style={{ fontWeight: '800', fontSize: '15px', color: '#1A1A1A', marginBottom: '4px' }}>Toutes nos pizzas sont disponibles en Méga</p>
              <p style={{ fontSize: '12px', color: '#888' }}>Choisissez parmi nos 29 pizzas ci-dessous</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {pizzas.filter(p => p.priceMega && (p.category === 'Base Tomate' || p.category === 'Base Crème')).map(pizza => (
                <PizzaCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </div>
        )}

        {/* VUE ARTICLES CATÉGORIE */}
        {activeCategory && selectedSection && (
          <div style={{ padding: '16px 16px 120px' }}>
            <button onClick={() => setActiveCategory(null)} style={{ all: 'unset', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#666', marginBottom: '16px', display: 'block' }}>
              ← Retour au menu
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: categoryMeta[activeCategory].color, borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                {categoryMeta[activeCategory].icon}
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>{selectedSection.label}</h2>
            </div>
            {itemsToShow.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {itemsToShow.map(pizza => <PizzaCard key={pizza.id} pizza={pizza} />)}
              </div>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '48px 16px', textAlign: 'center', border: '1px dashed #E0DAD4' }}>
                <p style={{ fontSize: '40px', marginBottom: '12px' }}>🚧</p>
                <p style={{ fontWeight: '700', fontSize: '15px', color: '#444', marginBottom: '6px' }}>Bientôt disponible</p>
                <p style={{ fontSize: '13px', color: '#AAA' }}>Cette rubrique arrive très prochainement !</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  )
}
