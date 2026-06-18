function GemIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
      <polygon points="8,1 15,6 12,17 4,17 1,6" fill="var(--blue)" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="8,1 15,6 8,8" fill="var(--blue-light)" />
      <polygon points="1,6 8,8 4,17" fill="var(--blue-dark)" />
    </svg>
  )
}

function Heart({ filled }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 16s-8-5.5-8-10A4.5 4.5 0 0 1 10 3.5 4.5 4.5 0 0 1 18 6c0 4.5-8 10-8 10z"
        fill={filled ? 'var(--red)' : 'var(--red)'}
        stroke="white"
        strokeWidth="1.5"
        opacity={filled ? 1 : 0.25}
      />
    </svg>
  )
}

export default function HUD({ questionNumber, totalQuestions, score, attemptsLeft, gems }) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px 10px',
      background: 'var(--ink)',
      borderBottom: '3px solid var(--ink)',
      flexShrink: 0,
    }}>
      {/* Question */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Question
        </span>
        <span style={{ fontFamily: 'Bangers', fontSize: 26, color: 'var(--paper)', letterSpacing: 1, lineHeight: '24px' }}>
          {questionNumber}{' '}
          <span style={{ fontSize: 15, color: '#888', fontFamily: 'Nunito', fontWeight: 700 }}>
            / {totalQuestions}
          </span>
        </span>
      </div>

      {/* Score */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Score
        </span>
        <span style={{ fontFamily: 'Bangers', fontSize: 26, color: 'var(--green)', letterSpacing: 1, lineHeight: '24px' }}>
          {score}
        </span>
      </div>

      {/* Hearts + Gems */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          {[1, 2, 3].map(i => (
            <Heart key={i} filled={i <= attemptsLeft} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <GemIcon />
          <span style={{ fontFamily: 'Bangers', fontSize: 22, color: 'var(--blue)', letterSpacing: 1, lineHeight: '22px' }}>
            {gems}
          </span>
        </div>
      </div>
    </div>
  )
}
