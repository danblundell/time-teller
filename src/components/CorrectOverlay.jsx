function StarBurst({ style }) {
  return (
    <div style={style}>
      <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <polygon points="26,2 30,20 48,16 35,28 46,44 28,37 22,54 19,36 2,40 14,27 4,12 22,18"
          fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function CorrectOverlay({ gemsEarned }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(26,16,8,0.5)',
      zIndex: 20,
      animation: 'overlayIn 0.2s ease',
    }}>
      {/* Stars */}
      <StarBurst style={{ position: 'absolute', top: 90, left: 20, pointerEvents: 'none' }} />
      <StarBurst style={{ position: 'absolute', top: 100, right: 24, width: 42, pointerEvents: 'none' }} />

      {/* Stamp */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        animation: 'stampIn 0.55s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
        transformOrigin: 'center',
      }}>
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
          <circle cx="150" cy="150" r="138" fill="var(--green)" stroke="var(--ink)" strokeWidth="6" />
          <circle cx="150" cy="150" r="122" fill="none" stroke="white" strokeWidth="4" strokeDasharray="12 8" />
          <circle cx="150" cy="150" r="112" fill="var(--green)" />
          <polyline points="72,152 118,198 224,96" fill="none" stroke="white" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Label below stamp */}
        <div style={{
          position: 'absolute', bottom: 16, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'Bangers', fontSize: 24, color: 'white', letterSpacing: 2,
          textShadow: '2px 2px 0 rgba(0,0,0,0.4)',
        }}>
          YOU GOT IT RIGHT!
        </div>
      </div>

      {/* Gem reward */}
      <div style={{
        position: 'absolute', bottom: 100, left: '50%',
        animation: 'fadeInUp 0.4s 0.4s ease both',
        background: 'var(--yellow)',
        border: '3.5px solid var(--ink)',
        borderRadius: 50,
        padding: '10px 24px',
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8,
        boxShadow: '4px 4px 0 var(--ink)',
        whiteSpace: 'nowrap',
      }}>
        <svg width="20" height="22" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
          <polygon points="8,1 15,6 12,17 4,17 1,6" fill="var(--blue)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="8,1 15,6 8,8" fill="var(--blue-light)" />
          <polygon points="1,6 8,8 4,17" fill="var(--blue-dark)" />
        </svg>
        <span style={{ fontFamily: 'Bangers', fontSize: 28, color: 'var(--ink)', letterSpacing: 1 }}>
          +{gemsEarned} GEMS!
        </span>
      </div>
    </div>
  )
}
