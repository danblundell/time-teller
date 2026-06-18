import HUD from './HUD'
import ClockFace from './ClockFace'
import DigitalInput from './DigitalInput'
import CorrectOverlay from './CorrectOverlay'
import TryAgainOverlay from './TryAgainOverlay'

function SubmitButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 68, height: 68, flexShrink: 0,
        background: disabled ? '#ccc' : 'var(--green)',
        border: '3.5px solid var(--ink)',
        borderRadius: '50%',
        boxShadow: disabled ? 'none' : '4px 4px 0 var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'transform 0.1s, box-shadow 0.1s',
      }}
      onMouseDown={e => { if (!disabled) { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 var(--ink)' } }}
      onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 var(--ink)' }}
    >
      <svg width="30" height="24" viewBox="0 0 32 26" xmlns="http://www.w3.org/2000/svg">
        <polyline points="2,13 11,22 30,3" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function GameScreen({
  phase,
  questionNumber, totalQuestions,
  currentTime, score, attemptsLeft, gems,
  hourInput, minuteInput,
  onHourChange, onMinuteChange, onSubmit,
  gemsEarned,
}) {
  const isOverlay = phase === 'correct' || phase === 'tryAgain'
  const canSubmit = !isOverlay && hourInput !== '' && minuteInput !== ''
  const isDesktop = window.innerWidth >= 768

  if (isDesktop) {
    return (
      <DesktopLayout
        phase={phase} questionNumber={questionNumber} totalQuestions={totalQuestions}
        currentTime={currentTime} score={score} attemptsLeft={attemptsLeft} gems={gems}
        hourInput={hourInput} minuteInput={minuteInput}
        onHourChange={onHourChange} onMinuteChange={onMinuteChange} onSubmit={onSubmit}
        isOverlay={isOverlay} canSubmit={canSubmit} gemsEarned={gemsEarned}
      />
    )
  }

  return (
    <MobileLayout
      phase={phase} questionNumber={questionNumber} totalQuestions={totalQuestions}
      currentTime={currentTime} score={score} attemptsLeft={attemptsLeft} gems={gems}
      hourInput={hourInput} minuteInput={minuteInput}
      onHourChange={onHourChange} onMinuteChange={onMinuteChange} onSubmit={onSubmit}
      isOverlay={isOverlay} canSubmit={canSubmit} gemsEarned={gemsEarned}
    />
  )
}

function MobileLayout({ phase, questionNumber, totalQuestions, currentTime, score, attemptsLeft, gems, hourInput, minuteInput, onHourChange, onMinuteChange, onSubmit, isOverlay, canSubmit, gemsEarned }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 480,
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="dot-bg" />

      <HUD questionNumber={questionNumber} totalQuestions={totalQuestions} score={score} attemptsLeft={attemptsLeft} gems={gems} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px', gap: 20, width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bangers', fontSize: 28, color: 'var(--ink)', letterSpacing: 2, lineHeight: '30px' }}>What time does</div>
          <div style={{ fontFamily: 'Bangers', fontSize: 28, color: 'var(--red)', letterSpacing: 2, lineHeight: '30px' }}>this clock show?</div>
        </div>

        <ClockFace time={currentTime} size={260} />

        <p style={{ fontFamily: 'Nunito', fontSize: 13, fontWeight: 700, color: 'var(--grey)' }}>Enter the time below</p>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <DigitalInput
            hourValue={hourInput} minuteValue={minuteInput}
            onHourChange={onHourChange} onMinuteChange={onMinuteChange}
            onSubmit={onSubmit} disabled={isOverlay}
          />
          <SubmitButton onClick={onSubmit} disabled={!canSubmit} />
        </div>

        <p style={{ fontFamily: 'Nunito', fontSize: 12, fontWeight: 600, color: 'var(--grey)', textAlign: 'center' }}>
          Type the time, then press Enter or tap ✓
        </p>
      </div>

      {phase === 'correct' && <CorrectOverlay gemsEarned={gemsEarned} />}
      {phase === 'tryAgain' && <TryAgainOverlay attemptsLeft={attemptsLeft} outOfAttempts={attemptsLeft === 0} />}
    </div>
  )
}

function DesktopLayout({ phase, questionNumber, totalQuestions, currentTime, score, attemptsLeft, gems, hourInput, minuteInput, onHourChange, onMinuteChange, onSubmit, isOverlay, canSubmit, gemsEarned }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="dot-bg" />

      {/* Desktop nav */}
      <div style={{
        width: '100%', height: 72, background: 'var(--ink)', borderBottom: '3px solid var(--ink)',
        display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 48px',
        flexShrink: 0, zIndex: 1, gap: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
          <svg width="28" height="28" viewBox="0 0 80 80">
            <polygon points="40,2 47,28 72,18 56,38 78,50 52,52 58,78 40,62 22,78 28,52 2,50 24,38 8,18 33,28"
              fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Bangers', fontSize: 26, color: 'var(--paper)', letterSpacing: 3 }}>TIME FOR FUN</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
          <NavStat label="Question" value={`${questionNumber} / ${totalQuestions}`} valueColor="var(--paper)" />
          <NavDivider />
          <NavStat label="Score" value={String(score)} valueColor="var(--green)" />
          <NavDivider />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Attempts</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1,2,3].map(i => (
                <svg key={i} width="20" height="18" viewBox="0 0 20 18">
                  <path d="M10 16s-8-5.5-8-10A4.5 4.5 0 0 1 10 3.5 4.5 4.5 0 0 1 18 6c0 4.5-8 10-8 10z"
                    fill="var(--red)" stroke="white" strokeWidth="1.2" opacity={i <= attemptsLeft ? 1 : 0.25} />
                </svg>
              ))}
            </div>
          </div>
          <NavDivider />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Gems</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="18" viewBox="0 0 16 18">
                <polygon points="8,1 15,6 12,17 4,17 1,6" fill="var(--blue)" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                <polygon points="8,1 15,6 8,8" fill="var(--blue-light)" />
                <polygon points="1,6 8,8 4,17" fill="var(--blue-dark)" />
              </svg>
              <span style={{ fontFamily: 'Bangers', fontSize: 22, color: 'var(--blue)', letterSpacing: 1, lineHeight: '22px' }}>{gems}</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />
      </div>

      {/* Two-column body */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center',
        gap: 80, padding: '0 80px', zIndex: 1,
      }}>
        {/* Clock side */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Bangers', fontSize: 34, color: 'var(--ink)', letterSpacing: 2 }}>
              What time does this clock show?
            </span>
          </div>
          <ClockFace time={currentTime} size={340} />
        </div>

        {/* Vertical divider */}
        <div style={{ width: 2, height: 380, background: 'var(--ink)', opacity: 0.12, borderRadius: 2, flexShrink: 0 }} />

        {/* Input side */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, minWidth: 360 }}>
          <div>
            <div style={{ fontFamily: 'Bangers', fontSize: 34, color: 'var(--ink)', letterSpacing: 2, lineHeight: '32px' }}>Enter the time</div>
            <p style={{ fontFamily: 'Nunito', fontSize: 14, fontWeight: 600, color: 'var(--grey)', marginTop: 6 }}>
              Type the hours and minutes, then press Enter or click ✓
            </p>
          </div>

          <DigitalInput
            hourValue={hourInput} minuteValue={minuteInput}
            onHourChange={onHourChange} onMinuteChange={onMinuteChange}
            onSubmit={onSubmit} disabled={isOverlay}
          />

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              style={{
                background: !canSubmit ? '#ccc' : 'var(--green)',
                border: '4px solid var(--ink)', borderRadius: 16,
                padding: '14px 40px', boxShadow: !canSubmit ? 'none' : '5px 5px 0 var(--ink)',
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10,
                cursor: !canSubmit ? 'default' : 'pointer',
                fontFamily: 'Bangers', fontSize: 28, color: 'white', letterSpacing: 2,
              }}
            >
              <svg width="24" height="20" viewBox="0 0 32 26">
                <polyline points="2,13 11,22 30,3" fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              SUBMIT
            </button>
            <span style={{ fontFamily: 'Nunito', fontSize: 13, fontWeight: 600, color: 'var(--grey)' }}>or press Enter ↵</span>
          </div>
        </div>
      </div>

      {phase === 'correct' && <CorrectOverlay gemsEarned={gemsEarned} />}
      {phase === 'tryAgain' && <TryAgainOverlay attemptsLeft={attemptsLeft} outOfAttempts={attemptsLeft === 0} />}
    </div>
  )
}

function NavStat({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontFamily: 'Bangers', fontSize: 24, color: valueColor, letterSpacing: 1, lineHeight: '22px' }}>{value}</span>
    </div>
  )
}

function NavDivider() {
  return <div style={{ width: 1, height: 36, background: 'rgba(255,254,242,0.15)' }} />
}
