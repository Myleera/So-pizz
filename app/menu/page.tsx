'use client'

import React, { useState } from 'react'
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

function CategoryIcon({ category }: { category: string }) {
  const c = categoryMeta[category]?.color ?? '#E8430A'
  const icons: Record<string, React.ReactElement> = {
    'Base Tomate': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <circle cx="22" cy="22" r="11" fill="white" fillOpacity="0.25" />
        <path d="M22 10 C22 10 20 8 22 6 C24 8 22 10 22 10Z" fill="white" fillOpacity="0.7" />
        <circle cx="17" cy="19" r="2.5" fill="white" fillOpacity="0.6" />
        <circle cx="26" cy="17" r="2.5" fill="white" fillOpacity="0.6" />
        <circle cx="22" cy="26" r="2.5" fill="white" fillOpacity="0.6" />
      </svg>
    ),
    'Base Crème': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <ellipse cx="22" cy="24" rx="10" ry="8" fill="white" fillOpacity="0.3" />
        <path d="M15 20 Q22 14 29 20 Q22 26 15 20Z" fill="white" fillOpacity="0.7" />
        <circle cx="19" cy="25" r="2" fill="white" fillOpacity="0.5" />
        <circle cx="25" cy="23" r="2" fill="white" fillOpacity="0.5" />
      </svg>
    ),
    'Nos Pizzwich': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <rect x="12" y="18" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
        <rect x="12" y="23" width="20" height="3" rx="1.5" fill="white" fillOpacity="0.6" />
        <rect x="14" y="28" width="16" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
        <rect x="14" y="13" width="16" height="3" rx="1.5" fill="white" fillOpacity="0.9" />
      </svg>
    ),
    'Nos Pâtes': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <path d="M14 22 Q18 16 22 22 Q26 28 30 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
        <path d="M14 26 Q18 20 22 26 Q26 32 30 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
        <path d="M14 18 Q18 12 22 18 Q26 24 30 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.5" />
      </svg>
    ),
    'Nos Salades': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <path d="M22 28 C16 28 12 24 12 20 C12 16 16 14 22 16 C28 14 32 16 32 20 C32 24 28 28 22 28Z" fill="white" fillOpacity="0.8" />
        <path d="M22 16 C22 16 18 12 20 10 C22 10 22 14 22 16Z" fill="white" fillOpacity="0.6" />
        <path d="M22 16 C22 16 26 11 28 13 C27 15 24 15 22 16Z" fill="white" fillOpacity="0.5" />
      </svg>
    ),
    'Nos Desserts': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <rect x="15" y="24" width="14" height="8" rx="2" fill="white" fillOpacity="0.8" />
        <path d="M15 24 Q22 16 29 24Z" fill="white" fillOpacity="0.6" />
        <rect x="21" y="14" width="2" height="6" rx="1" fill="white" fillOpacity="0.7" />
        <circle cx="22" cy="13" r="2" fill="white" fillOpacity="0.9" />
      </svg>
    ),
    'Nos Boissons': (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" fill={c} />
        <path d="M16 15 L17 31 Q22 34 27 31 L28 15Z" fill="white" fillOpacity="0.8" />
        <path d="M16 15 L28 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <path d="M22 12 L22 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        <ellipse cx="22" cy="22" rx="5" ry="3" fill={c} fillOpacity="0.3" />
      </svg>
    ),
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {icons[category] ?? (
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="18" fill={c} />
        </svg>
      )}
    </div>
  )
}

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

                {/* 2. Base Crème */}
                <button onClick={() => setActiveCategory('Base Crème')} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px', overflow: 'hidden', border: '1px solid #F0EBE5', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <Image src={categoryMeta['Base Crème'].image} alt="Base Crème" fill sizes="(min-width:768px) 280px, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                    <p style={{ fontWeight: '800', fontSize: '13px', color: '#1A1A1A', margin: 0 }}>Base Crème</p>
                  </div>
                </button>

                {/* 3. Pizzas Méga */}
                <button onClick={() => setShowMega(true)} style={{ all: 'unset', cursor: 'pointer', backgroundColor: 'white', borderRadius: '18px', overflow: 'hidden', border: '2px solid #FFCDB8', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(232,67,10,0.12)' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <Image src="/images/cat-pizzas-megas.png" alt="Pizzas Méga" fill sizes="(min-width:768px) 280px, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 12px', textAlign: 'center' }}>
                    <p style={{ fontWeight: '800', fontSize: '13px', color: '#E8430A', margin: 0 }}>Pizzas Méga</p>
                  </div>
                </button>

                {/* 4. Reste (sans Base Tomate et Base Crème) */}
                {allSections.filter(s => s.key !== 'Base Tomate' && s.key !== 'Base Crème').map(({ key, label }) => (
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
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <CategoryIcon category={activeCategory} />
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A1A', margin: '10px 0 0' }}>
                {selectedSection.label}
              </h2>
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
