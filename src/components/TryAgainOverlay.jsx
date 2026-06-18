function Heart({ filled }) {
  return (
    <svg width="32" height="28" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 16s-8-5.5-8-10A4.5 4.5 0 0 1 10 3.5 4.5 4.5 0 0 1 18 6c0 4.5-8 10-8 10z"
        fill={filled ? 'var(--red)' : 'none'}
        stroke="white"
        strokeWidth="1.5"
        opacity={filled ? 1 : 0.4}
      />
    </svg>
  )
}

export default function TryAgainOverlay({ attemptsLeft, outOfAttempts }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(26,16,8,0.5)',
      zIndex: 20,
      animation: 'overlayIn 0.2s ease',
    }}>
      {/* Speech bubble */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        animation: 'bubbleIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        transformOrigin: 'center',
      }}>
        <svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" width="340" height="210">
          <rect x="4" y="4" width="332" height="165" rx="24" ry="24" fill="rgba(0,0,0,0.2)" />
          <rect x="0" y="0" width="332" height="165" rx="24" ry="24" fill="var(--red)" stroke="var(--ink)" strokeWidth="5" />
          <rect x="10" y="10" width="312" height="145" rx="18" ry="18" fill="none" stroke="white" strokeWidth="3" strokeDasharray="10 7" />
          <polygon points="60,160 28,205 110,160" fill="var(--red)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" />
          <polygon points="65,162 32,200 108,162" fill="var(--red)" />
        </svg>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: 332, height: 165,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <span style={{ fontFamily: 'Bangers', fontSize: 54, color: 'white', letterSpacing: 4, lineHeight: '50px', textShadow: '3px 3px 0 rgba(0,0,0,0.25)' }}>
            {outOfAttempts ? 'MOVING ON!' : 'TRY AGAIN!'}
          </span>
          <span style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
            {outOfAttempts ? 'Better luck next time' : 'That wasn’t quite right'}
          </span>
        </div>
      </div>

      {/* Attempts left */}
      {!outOfAttempts && (
        <div style={{
          position: 'absolute', bottom: 110, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'fadeInUp 0.4s 0.3s ease both',
        }}>
          <span style={{ fontFamily: 'Nunito', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,242,0.8)', letterSpacing: 1, textTransform: 'uppercase' }}>
            Attempts left
          </span>
          <div style={{ display: 'flex', gap: 10 }}>
            {[1, 2, 3].map(i => <Heart key={i} filled={i <= attemptsLeft} />)}
          </div>
        </div>
      )}
    </div>
  )
}
