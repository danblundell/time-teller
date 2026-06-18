const BURSTS = [
  { cx: '18%', cy: 140, color: '#FFD600', size: 55, delay: 0 },
  { cx: '82%', cy: 110, color: '#E8271D', size: 48, delay: 0.1 },
  { cx: '12%', cy: 340, color: '#4A90D9', size: 36, delay: 0.2 },
  { cx: '88%', cy: 320, color: '#1DBF4E', size: 42, delay: 0.15 },
  { cx: '50%', cy: 60,  color: '#FFD600', size: 30, delay: 0.3 },
]

const DIRS = [0, 45, 90, 135, 180, 225, 270, 315]

function FireworkBurst({ cx, cy, color, size, delay }) {
  return (
    <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0 }}>
      {DIRS.map((angle, i) => {
        const rad = (angle - 90) * (Math.PI / 180)
        const dx = Math.cos(rad) * size
        const dy = Math.sin(rad) * size
        return (
          <div key={i} style={{
            position: 'absolute',
            width: 10, height: 10,
            borderRadius: '50%',
            background: color,
            border: '2px solid var(--ink)',
            transform: 'translate(-5px,-5px)',
            animation: `shoot 0.9s ${delay + i * 0.02}s ease-out both`,
            '--dx': `${dx}px`,
            '--dy': `${dy}px`,
          }} />
        )
      })}
    </div>
  )
}

export default function WonScreen({ score, totalQuestions, gems, maxGems, onPlayAgain }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink)',
      overflow: 'hidden',
      padding: '40px 24px',
    }}>
      {/* Fireworks */}
      {BURSTS.map((b, i) => <FireworkBurst key={i} {...b} />)}

      {/* Confetti dots */}
      {[
        { x: '38%', y: 60,  c: '#FFD600', r: 5 },
        { x: '62%', y: 80,  c: '#E8271D', r: 4 },
        { x: '8%',  y: 200, c: '#1DBF4E', r: 4 },
        { x: '92%', y: 220, c: '#FFD600', r: 5 },
        { x: '28%', y: 290, c: '#E8271D', r: 3.5 },
        { x: '72%', y: 260, c: '#4A90D9', r: 4 },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.x, top: d.y,
          width: d.r * 2, height: d.r * 2, borderRadius: '50%',
          background: d.c, pointerEvents: 'none',
        }} />
      ))}

      {/* Content */}
      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, animation: 'wonEntry 0.6s ease both' }}>

        {/* Round complete badge */}
        <div style={{
          background: 'var(--red)', border: '3px solid var(--yellow)',
          borderRadius: 50, padding: '5px 20px', marginBottom: 14,
        }}>
          <span style={{ fontFamily: 'Nunito', fontSize: 13, fontWeight: 800, color: 'white', letterSpacing: 2, textTransform: 'uppercase' }}>
            Round Complete!
          </span>
        </div>

        {/* YOU WON */}
        <div style={{
          fontFamily: 'Bangers', fontSize: 88, color: 'var(--yellow)',
          letterSpacing: 5, lineHeight: '82px', textAlign: 'center',
          textShadow: '5px 5px 0 var(--red), 8px 8px 0 rgba(0,0,0,0.35)',
          marginBottom: 36,
        }}>
          YOU<br />WON!
        </div>

        {/* Score card */}
        <div style={{
          width: 320, background: 'var(--paper)',
          border: '4px solid var(--yellow)', borderRadius: 20,
          padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: '6px 6px 0 var(--yellow)',
        }}>
          <ScoreRow
            icon={<CheckIcon />}
            label="Correct answers"
            value={`${score} / ${totalQuestions}`}
            valueColor="var(--green)"
          />
          <Divider />
          <ScoreRow
            icon={<GemIcon />}
            label="Gems collected"
            value={String(gems)}
            valueColor="var(--blue)"
          />
          <Divider />
          <ScoreRow
            icon={<StarIcon />}
            label="Max possible"
            value={String(maxGems)}
            valueColor="var(--grey)"
          />
        </div>

        {/* Play again */}
        <button
          onClick={onPlayAgain}
          style={{
            marginTop: 32,
            background: 'var(--yellow)', border: '4px solid var(--yellow)',
            borderRadius: 16, padding: '14px 48px',
            boxShadow: '5px 5px 0 var(--red), 7px 7px 0 rgba(0,0,0,0.25)',
            cursor: 'pointer', fontFamily: 'Bangers', fontSize: 34, color: 'var(--ink)',
            letterSpacing: 3, animation: 'pulse 2s 1s ease-in-out infinite',
          }}
        >
          PLAY AGAIN!
        </button>

        <p style={{ marginTop: 16, fontFamily: 'Nunito', fontSize: 13, fontWeight: 600, color: 'rgba(255,254,242,0.45)' }}>
          Can you beat your score?
        </p>
      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 2, background: '#e8e0cc', borderRadius: 1 }} />
}

function ScoreRow({ icon, label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {icon}
        <span style={{ fontFamily: 'Nunito', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
      </div>
      <span style={{ fontFamily: 'Bangers', fontSize: 30, color: valueColor, letterSpacing: 1 }}>{value}</span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="10" fill="var(--green)" stroke="var(--ink)" strokeWidth="2" />
      <polyline points="5,11 9,15 17,7" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GemIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 16 18">
      <polygon points="8,1 15,6 12,17 4,17 1,6" fill="var(--blue)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="8,1 15,6 8,8" fill="var(--blue-light)" />
      <polygon points="1,6 8,8 4,17" fill="var(--blue-dark)" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 52 52">
      <polygon points="26,2 30,20 48,16 35,28 46,44 28,37 22,54 19,36 2,40 14,27 4,12 22,18"
        fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
