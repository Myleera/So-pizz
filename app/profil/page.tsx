export default function ProfilPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>👤</div>
      <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A1A', marginBottom: '10px' }}>Mon Profil</h1>
      <p style={{ fontSize: '14px', color: '#AAA', lineHeight: '1.6', maxWidth: '260px' }}>
        Cette section arrive très prochainement.<br />Fidélité, historique et préférences au même endroit.
      </p>
      <div style={{ marginTop: '28px', backgroundColor: '#FFF0EB', borderRadius: '12px', padding: '10px 20px' }}>
        <span style={{ color: '#E8430A', fontWeight: '700', fontSize: '13px' }}>Bientôt disponible</span>
      </div>
    </main>
  )
}
