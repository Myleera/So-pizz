export default function MagasinsPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>📍</div>
      <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A1A', marginBottom: '10px' }}>Nos Magasins</h1>
      <p style={{ fontSize: '14px', color: '#AAA', lineHeight: '1.6', maxWidth: '260px' }}>
        SO PIZZ — Draria, Alger<br />Livraison gratuite dans votre quartier.
      </p>
      <a
        href="https://maps.google.com/?q=Draria,+Alger"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', marginTop: '28px', backgroundColor: '#E8430A', borderRadius: '12px', padding: '12px 24px', display: 'inline-block' }}
      >
        <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>📍 Voir sur la carte</span>
      </a>
    </main>
  )
}
