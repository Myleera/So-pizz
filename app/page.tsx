'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('splashSeen')) return
    setShowSplash(true)
    const fadeTimer = setTimeout(() => setFadingOut(true), 2000)
    const hideTimer = setTimeout(() => {
      setShowSplash(false)
      sessionStorage.setItem('splashSeen', '1')
    }, 2600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* SPLASH SCREEN */}
      {showSplash && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          opacity: fadingOut ? 0 : 1,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}>
          <Image
            src="/images/splash.png"
            alt="SO PIZZ"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {/* IMAGE PRINCIPALE */}
      <div style={{ flex: 1 }}>
        <Image
          src="/images/accueil.png"
          alt="SO PIZZ — The French Touch"
          width={1080}
          height={2128}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* BANDE VOIR LE MENU */}
      <Link href="/menu" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          backgroundColor: '#FFD700',
          padding: '22px 24px',
          textAlign: 'center',
        }}>
          <span style={{ color: '#E8430A', fontWeight: '900', fontSize: '24px', letterSpacing: '0.5px' }}>
            Voir notre menu →
          </span>
        </div>
      </Link>

      {/* BANDE RÉSEAUX SOCIAUX */}
      <div style={{
        backgroundColor: '#C93A09',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        alignItems: 'center',
      }}>
        <a href="https://www.facebook.com/sopizz.dz" target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.2)" />
            <path d="M13.5 8H15V6H13C11.9 6 11 6.9 11 8V10H9V12H11V18H13V12H14.7L15 10H13V8.5C13 8.22 13.22 8 13.5 8Z" fill="white" />
          </svg>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>@sopizz_dz</span>
        </a>
        <a href="https://www.instagram.com/sopizz_dz" target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(255,255,255,0.2)" />
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" />
            <circle cx="17.2" cy="6.8" r="1.3" fill="white" />
          </svg>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>@sopizz_dz</span>
        </a>
      </div>

    </main>
  )
}
