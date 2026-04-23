'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

function IconHome({ active }: { active: boolean }) {
  const c = active ? '#E8430A' : '#C04A00'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" fill={c} />
    </svg>
  )
}

function IconProfil({ active }: { active: boolean }) {
  const c = active ? '#E8430A' : '#C04A00'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={c} />
      <path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconHistorique({ active }: { active: boolean }) {
  const c = active ? '#E8430A' : '#C04A00'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" />
      <path d="M12 7V12L15 15" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMagasin({ active }: { active: boolean }) {
  const c = active ? '#E8430A' : '#C04A00'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.686 2 6 4.686 6 8C6 12.5 12 21 12 21C12 21 18 12.5 18 8C18 4.686 15.314 2 12 2Z" fill={c} />
      <circle cx="12" cy="8" r="2.5" fill="white" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/',           label: 'Accueil',    Icon: IconHome },
  { href: '/profil',     label: 'Avis clients', Icon: IconProfil },
  { href: '/historique', label: 'Historique', Icon: IconHistorique },
  { href: '/magasins',   label: 'Restaurants', Icon: IconMagasin },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  if (pathname === '/' || pathname === '/cart') {
    return <style>{`body { padding-bottom: 0 !important; }`}</style>
  }

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: 'white',
      borderTop: '1px solid #F0EBE5',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div className="bottom-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '68px' }}>

        {/* Accueil + Profil */}
        {NAV_ITEMS.slice(0, 2).map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
              <Icon active={active} />
              <span className="nav-label" style={{ fontSize: '10px', fontWeight: active ? '700' : '400', color: active ? '#E8430A' : '#C04A00' }}>
                {label}
              </span>
            </Link>
          )
        })}

        {/* PANIER — bouton central */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/cart" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', marginTop: '-28px' }}>
              <div className="panier-btn" style={{
                width: '76px', height: '76px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: '3px solid #F0EBE5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.14)',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <Image
                  src="/images/panier.png"
                  alt="Panier"
                  fill
                  sizes="76px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  backgroundColor: '#E8430A', color: 'white',
                  borderRadius: '50%', width: '20px', height: '20px',
                  fontSize: '11px', fontWeight: '800',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid white',
                }}>
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Historique + Magasins */}
        {NAV_ITEMS.slice(2, 4).map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
              <Icon active={active} />
              <span className="nav-label" style={{ fontSize: '10px', fontWeight: active ? '700' : '400', color: active ? '#E8430A' : '#C04A00' }}>
                {label}
              </span>
            </Link>
          )
        })}

      </div>
    </div>
  )
}
