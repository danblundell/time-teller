export default function WelcomeScreen({ onStart }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 480,
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="dot-bg" />

      {/* Corner starburst */}
      <div style={{ position: 'absolute', top: 32, right: 24, width: 72, height: 72, pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="72" height="72">
          <polygon points="40,2 47,28 72,18 56,38 78,50 52,52 58,78 40,62 22,78 28,52 2,50 24,38 8,18 33,28"
            fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          <text x="40" y="45" textAnchor="middle" fontFamily="Bangers" fontSize="13px" fill="var(--ink)">WOW!</text>
        </svg>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 32, zIndex: 1 }}>
        <span style={{ fontFamily: 'Bangers', fontSize: 20, color: 'var(--red)', letterSpacing: 3, textTransform: 'uppercase' }}>
          Can you read the
        </span>
        <span style={{
          fontFamily: 'Bangers', fontSize: 80, color: 'var(--ink)', letterSpacing: 4, lineHeight: '76px',
          textShadow: '4px 4px 0 var(--yellow), 7px 7px 0 var(--ink)',
        }}>
          TIME?
        </span>
      </div>

      {/* Decorative clock */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="200" height="200" style={{ zIndex: 1 }}>
        <circle cx="105" cy="105" r="88" fill="rgba(0,0,0,0.1)" />
        <circle cx="100" cy="100" r="88" fill="var(--red)" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="100" cy="100" r="78" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
        <text x="100" y="34" textAnchor="middle" dominantBaseline="middle" fontFamily="Bangers" fontSize="17px" fill="var(--ink)">12</text>
        <text x="166" y="102" textAnchor="middle" dominantBaseline="middle" fontFamily="Bangers" fontSize="17px" fill="var(--ink)">3</text>
        <text x="100" y="170" textAnchor="middle" dominantBaseline="middle" fontFamily="Bangers" fontSize="17px" fill="var(--ink)">6</text>
        <text x="34" y="102" textAnchor="middle" dominantBaseline="middle" fontFamily="Bangers" fontSize="17px" fill="var(--ink)">9</text>
        {/* ~10:10 hands */}
        <line x1="100" y1="100" x2="68" y2="52" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="100" x2="134" y2="46" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="100" cy="100" r="6" fill="var(--red)" stroke="var(--ink)" strokeWidth="2" />
      </svg>

      <p style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 16, color: 'var(--ink)', textAlign: 'center', margin: '24px 0 36px', zIndex: 1, lineHeight: '22px' }}>
        10 questions · Earn gems · Beat the clock!
      </p>

      <button
        onClick={onStart}
        style={{
          background: 'var(--green)',
          border: '4px solid var(--ink)',
          borderRadius: 16,
          boxShadow: '5px 5px 0 var(--ink)',
          padding: '16px 52px',
          cursor: 'pointer',
          fontFamily: 'Bangers',
          fontSize: 38,
          color: 'var(--paper)',
          letterSpacing: 3,
          zIndex: 1,
          transition: 'transform 0.1s, box-shadow 0.1s',
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'translate(3px,3px)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--ink)' }}
        onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '5px 5px 0 var(--ink)' }}
      >
        LET&rsquo;S GO!
      </button>

      <p style={{ position: 'absolute', bottom: 28, fontFamily: 'Nunito', fontSize: 13, fontWeight: 600, color: 'var(--grey)', zIndex: 1 }}>
        Tap to start your adventure
      </p>
    </div>
  )
}
