import Image from 'next/image'

const restaurants = [
  {
    id: 1,
    ville: 'Tlemcen',
    quartier: 'Boulevard Imama',
    tel: '0553166034',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Boulevard+Imama+Tlemcen',
    aVenir: false,
  },
  {
    id: 2,
    ville: 'Alger',
    quartier: 'Draria',
    tel: '0670074277',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Draria+Alger',
    aVenir: false,
  },
  {
    id: 3,
    ville: 'Oran',
    quartier: 'Maraval',
    tel: '0558891094',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Maraval+Oran',
    aVenir: false,
  },
  {
    id: 4,
    ville: 'Oran',
    quartier: 'USTO',
    tel: '0552257800',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+USTO+Oran',
    aVenir: false,
  },
  {
    id: 5,
    ville: 'Oran',
    quartier: 'Frange Maritime',
    tel: '0557151957',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Frange+Maritime+Oran',
    aVenir: false,
  },
  {
    id: 6,
    ville: 'Oran',
    quartier: 'Gambetta',
    tel: '0549368933',
    maps: 'https://www.google.com/maps/search/SO+PIZZ+Gambetta+Oran',
    aVenir: false,
  },
  {
    id: 7,
    ville: 'Alger',
    quartier: 'Kouba',
    tel: '',
    maps: '',
    aVenir: true,
  },
]

export default function RestaurantsPage() {
  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* HEADER IMAGE */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
          <Image
            src="/images/fanchises.png"
            alt="Nos Restaurants SO PIZZ"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
          }} />
        </div>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '20px 20px 0',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'white', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Nos Restaurants
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: '4px 0 0', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
            {restaurants.filter(r => !r.aVenir).length} adresses ouvertes · {restaurants.filter(r => r.aVenir).length} à venir
          </p>
        </div>
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
              border: r.aVenir ? '1.5px dashed #DDCFC8' : '1px solid #F0EBE5',
              boxShadow: r.aVenir ? 'none' : '0 2px 12px rgba(0,0,0,0.06)',
              opacity: r.aVenir ? 0.75 : 1,
            }}
          >
            <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                backgroundColor: r.aVenir ? '#F5F0EC' : '#FFF0EB', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: r.aVenir ? '#BBB' : '#E8430A' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '900', color: r.aVenir ? '#AAA' : '#1A1A1A', margin: 0 }}>
                    {r.quartier}
                  </p>
                  {r.aVenir && (
                    <span style={{
                      fontSize: '10px', fontWeight: '800', color: '#888',
                      backgroundColor: '#F0EFED', padding: '2px 8px', borderRadius: '20px',
                      letterSpacing: '0.3px',
                    }}>
                      À VENIR
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#AAA', margin: 0, fontWeight: '500' }}>
                  {r.ville}
                </p>
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: r.aVenir ? '#BBB' : '#E8430A',
                backgroundColor: r.aVenir ? '#F5F0EC' : '#FFF0EB',
                padding: '4px 10px', borderRadius: '20px',
              }}>
                {r.ville}
              </span>
            </div>

            {!r.aVenir && (
              <>
                <div style={{ height: '1px', backgroundColor: '#F5F0EB', margin: '0 16px' }} />
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
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#E8430A' }}>Itinéraire</span>
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
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{r.tel}</span>
                  </a>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

    </main>
  )
}
