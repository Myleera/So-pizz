const restaurants = [
  {
    id: 1,
    ville: 'Tlemcen',
    quartier: 'Boulevard Imama',
    adresse: 'Boulevard Imama, Tlemcen',
    tel: '0553166034',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Boulevard+Imama+Tlemcen',
  },
  {
    id: 2,
    ville: 'Alger',
    quartier: 'Draria',
    adresse: 'Draria, Alger',
    tel: '0670074277',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Draria+Alger',
  },
  {
    id: 3,
    ville: 'Oran',
    quartier: 'Maraval',
    adresse: 'Maraval, Oran',
    tel: '0558891094',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Maraval+Oran',
  },
  {
    id: 4,
    ville: 'Oran',
    quartier: 'USTO',
    adresse: 'USTO, Oran',
    tel: '0552257800',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+USTO+Oran',
  },
  {
    id: 5,
    ville: 'Oran',
    quartier: 'Frange Maritime',
    adresse: 'Frange Maritime, Oran',
    tel: '0557151957',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Frange+Maritime+Oran',
  },
  {
    id: 6,
    ville: 'Oran',
    quartier: 'Gambetta',
    adresse: 'Gambetta, Oran',
    tel: '0549368933',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Gambetta+Oran',
  },
]

export default function RestaurantsPage() {
  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* HEADER */}
      <div style={{ backgroundColor: '#E8430A', padding: '32px 20px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: '36px', margin: '0 0 8px' }}>📍</p>
        <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'white', margin: '0 0 6px' }}>
          Nos Restaurants
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          {restaurants.length} adresses à travers l'Algérie
        </p>
      </div>

      {/* LISTE */}
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {restaurants.map((r, i) => (
          <div
            key={r.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid #F0EBE5',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            {/* En-tête de la carte */}
            <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Numéro */}
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                backgroundColor: '#FFF0EB', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: '#E8430A' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              {/* Nom + adresse */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '16px', fontWeight: '900', color: '#1A1A1A', margin: '0 0 2px' }}>
                  {r.quartier}
                </p>
                <p style={{ fontSize: '13px', color: '#888', margin: 0, fontWeight: '500' }}>
                  {r.ville}
                </p>
              </div>
              {/* Ville badge */}
              <span style={{
                fontSize: '11px', fontWeight: '700', color: '#E8430A',
                backgroundColor: '#FFF0EB', padding: '4px 10px', borderRadius: '20px',
              }}>
                {r.ville}
              </span>
            </div>

            {/* Séparateur */}
            <div style={{ height: '1px', backgroundColor: '#F5F0EB', margin: '0 16px' }} />

            {/* Boutons */}
            <div style={{ padding: '12px 16px', display: 'flex', gap: '10px' }}>
              <a
                href={r.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: '#FFF0EB', borderRadius: '12px', padding: '12px 10px',
                  border: '1px solid #FFCDB8',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.686 2 6 4.686 6 8C6 12.5 12 21 12 21C12 21 18 12.5 18 8C18 4.686 15.314 2 12 2Z" fill="#E8430A"/>
                  <circle cx="12" cy="8" r="2.5" fill="white"/>
                </svg>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#E8430A' }}>
                  Itinéraire
                </span>
              </a>

              <a
                href={`tel:${r.tel}`}
                style={{
                  flex: 1, textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: '#E8430A', borderRadius: '12px', padding: '12px 10px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6.6 10.8C7.8 13.2 9.8 15.2 12.2 16.4L14.2 14.4C14.5 14.1 14.9 14 15.3 14.2C16.5 14.6 17.8 14.8 19 14.8C19.6 14.8 20 15.2 20 15.8V19C20 19.6 19.6 20 19 20C10.2 20 3 12.8 3 4C3 3.4 3.4 3 4 3H7.2C7.8 3 8.2 3.4 8.2 4C8.2 5.2 8.4 6.5 8.8 7.7C8.9 8.1 8.8 8.5 8.5 8.8L6.6 10.8Z" fill="white"/>
                </svg>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>
                  {r.tel}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}
