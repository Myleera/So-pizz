'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF8F5' }}>

      {/* HEADER */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #F0EBE5' }}
        className="flex items-center justify-between px-6 py-4">
        <Image src="/images/logo.png" alt="SO PIZZ" width={100} height={50} />
        <Link href="/cart">
          <div style={{ backgroundColor: '#FFF0EB', borderRadius: '12px', padding: '8px 12px' }}>
            <span style={{ color: '#E8430A', fontSize: '13px', fontWeight: '600' }}>🛒 Panier</span>
          </div>
        </Link>
      </header>

      {/* HERO IMAGE */}
      <section style={{ backgroundColor: '#E8430A', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ color: '#FFD0B0', fontSize: '12px', letterSpacing: '3px', marginBottom: '8px' }}>
          THE FRENCH TOUCH
        </p>
        <h1 style={{ color: 'white', fontSize: '42px', fontWeight: '900', marginBottom: '8px' }}>
          SO PIZZ
        </h1>
        <p style={{ color: '#FFD0B0', fontSize: '15px', marginBottom: '24px' }}>
          Pizzas artisanales cuites au feu de bois
        </p>
        <Link href="/menu">
          <button style={{
            backgroundColor: 'white', color: '#E8430A',
            borderRadius: '50px', padding: '14px 32px',
            fontWeight: '700', fontSize: '15px', border: 'none'
          }}>
            Voir le menu →
          </button>
        </Link>
      </section>

      {/* RÉSEAUX SOCIAUX */}
      <section style={{ backgroundColor: 'white', padding: '20px 24px', borderBottom: '1px solid #F0EBE5' }}>
        <p style={{ color: '#AAA', fontSize: '11px', textAlign: 'center', marginBottom: '12px', letterSpacing: '2px' }}>
          SUIVEZ-NOUS
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://facebook.com/SOPIZZ_DZ" target="_blank"
            style={{ flex: 1, backgroundColor: '#E8F4FD', borderRadius: '12px', padding: '12px', textAlign: 'center', textDecoration: 'none' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>f</div>
            <div style={{ color: '#1877F2', fontSize: '11px', fontWeight: '600' }}>SOPIZZ_DZ</div>
          </a>
          <a href="https://instagram.com/SOPIZZ_DZ" target="_blank"
            style={{ flex: 1, backgroundColor: '#FFF0F5', borderRadius: '12px', padding: '12px', textAlign: 'center', textDecoration: 'none' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>📸</div>
            <div style={{ color: '#E1306C', fontSize: '11px', fontWeight: '600' }}>SOPIZZ_DZ</div>
          </a>
        </div>
      </section>

      {/* BANNIÈRE PROMO */}
      <div style={{ backgroundColor: '#FFF8F0', borderLeft: '4px solid #E8430A', margin: '16px', borderRadius: '12px', padding: '14px 16px' }}>
        <p style={{ color: '#E8430A', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>
          🛵 Livraison gratuite
        </p>
        <p style={{ color: '#888', fontSize: '12px' }}>
          Chemin des Crêtes, Draria
        </p>
      </div>

      {/* ARGUMENTS */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', padding: '0 16px 16px' }}>
        {[
          { icon: '🔥', label: 'Feu de bois' },
          { icon: '🌿', label: 'Ingrédients frais' },
          { icon: '🛵', label: 'Livraison rapide' },
        ].map((arg) => (
          <div key={arg.label} style={{
            backgroundColor: 'white', borderRadius: '12px',
            padding: '16px 8px', textAlign: 'center',
            border: '1px solid #F0EBE5'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{arg.icon}</div>
            <p style={{ color: '#666', fontSize: '11px', fontWeight: '500' }}>{arg.label}</p>
          </div>
        ))}
      </section>

      {/* CTA MENU */}
      <section style={{ padding: '0 16px 16px' }}>
        <Link href="/menu">
          <div style={{
            backgroundColor: 'white', borderRadius: '16px', padding: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            border: '1px solid #F0EBE5'
          }}>
            <div>
              <p style={{ fontWeight: '700', fontSize: '15px', color: '#222', marginBottom: '4px' }}>
                29 pizzas disponibles
              </p>
              <p style={{ fontSize: '12px', color: '#888' }}>
                Base Tomate & Base Crème
              </p>
            </div>
            <div style={{ backgroundColor: '#E8430A', borderRadius: '10px', padding: '10px 16px' }}>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>→</span>
            </div>
          </div>
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '16px', marginTop: 'auto' }}>
        <p style={{ color: '#888', fontSize: '12px' }}>📞 06 70 07 42 77</p>
        <p style={{ color: '#BBB', fontSize: '11px', marginTop: '4px' }}>@SOPIZZ_DZ</p>
      </footer>

    </main>
  )
}