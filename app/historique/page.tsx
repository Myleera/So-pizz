export default function HistoriquePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🕐</div>
      <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A1A', marginBottom: '10px' }}>Historique</h1>
      <p style={{ fontSize: '14px', color: '#AAA', lineHeight: '1.6', maxWidth: '260px' }}>
        Retrouvez ici toutes vos commandes passées.<br />Cette fonctionnalité arrive très bientôt.
      </p>
      <div style={{ marginTop: '28px', backgroundColor: '#FFF0EB', borderRadius: '12px', padding: '10px 20px' }}>
        <span style={{ color: '#E8430A', fontWeight: '700', fontSize: '13px' }}>Bientôt disponible</span>
      </div>
    </main>
  )
}
