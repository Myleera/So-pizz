'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--noir)' }}>

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: 'var(--noir-card)' }}>
        <Image src="/images/logo.png" alt="SO PIZZ" width={120} height={60} />
        <Link href="/cart">
          <div className="relative">
            <span className="text-2xl">🛒</span>
          </div>
        </Link>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 gap-6"
        style={{ background: 'linear-gradient(180deg, var(--noir-card) 0%, var(--noir) 100%)' }}>
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-widest" style={{ color: 'var(--orange)' }}>
            The French Touch
          </p>
          <h1 className="text-5xl font-black uppercase" style={{ color: 'var(--blanc)' }}>
            SO PIZZ
          </h1>
          <p className="text-lg" style={{ color: 'var(--blanc-muted)' }}>
            Pizzas artisanales cuites au feu de bois
          </p>
        </div>

        <Link href="/menu">
          <button className="px-8 py-4 rounded-full text-white font-bold text-lg uppercase tracking-wide transition-all active:scale-95"
            style={{ backgroundColor: 'var(--orange)' }}>
            Voir le menu
          </button>
        </Link>
      </section>

      {/* BANNIÈRE PROMO */}
      <div className="mx-4 rounded-2xl px-6 py-4 text-center"
        style={{ backgroundColor: 'var(--rouge)' }}>
        <p className="font-bold text-white text-sm uppercase tracking-wide">
          🛵 Livraison gratuite — Chemin des Crêtes, Draria
        </p>
      </div>

      {/* ARGUMENTS */}
      <section className="grid grid-cols-3 gap-4 px-4 py-8">
        {[
          { icon: '🔥', label: 'Feu de bois' },
          { icon: '🌿', label: 'Ingrédients frais' },
          { icon: '🛵', label: 'Livraison rapide' },
        ].map((arg) => (
          <div key={arg.label} className="flex flex-col items-center gap-2 rounded-2xl py-4"
            style={{ backgroundColor: 'var(--noir-card)' }}>
            <span className="text-3xl">{arg.icon}</span>
            <p className="text-xs text-center font-medium" style={{ color: 'var(--blanc-muted)' }}>
              {arg.label}
            </p>
          </div>
        ))}
      </section>

      {/* CTA BAS */}
      <section className="px-4 pb-10">
        <Link href="/menu">
          <div className="rounded-2xl p-6 flex items-center justify-between"
            style={{ backgroundColor: 'var(--noir-card)', border: '1px solid var(--gris)' }}>
            <div>
              <p className="font-bold text-lg" style={{ color: 'var(--blanc)' }}>
                29 pizzas disponibles
              </p>
              <p className="text-sm" style={{ color: 'var(--blanc-muted)' }}>
                Base Tomate & Base Crème
              </p>
            </div>
            <span className="text-3xl">🍕</span>
          </div>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center pb-8 px-4">
        <p className="text-xs" style={{ color: 'var(--blanc-muted)' }}>
          📞 06 70 07 42 77
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--gris)' }}>
          @SOPIZZ_DZ
        </p>
      </footer>

    </main>
  )
}