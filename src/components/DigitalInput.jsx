import { useRef, useEffect } from 'react'

export default function DigitalInput({ hourValue, minuteValue, onHourChange, onMinuteChange, onSubmit, disabled }) {
  const hourRef = useRef(null)
  const minRef = useRef(null)

  useEffect(() => {
    if (!disabled) hourRef.current?.focus()
  }, [disabled])

  function handleHourKey(e) {
    if (e.key === 'Enter') { if (hourValue && minuteValue) onSubmit(); return }
    if (e.key === ':' || e.key === 'Tab') {
      e.preventDefault()
      minRef.current?.focus()
      minRef.current?.select()
      return
    }
  }

  function handleMinKey(e) {
    if (e.key === 'Enter') { if (hourValue && minuteValue) onSubmit(); return }
    if (e.key === 'Backspace' && minuteValue === '') {
      hourRef.current?.focus()
      hourRef.current?.select()
    }
  }

  function handleHourChange(e) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2)
    onHourChange(val)
    if (val.length === 2) {
      minRef.current?.focus()
      minRef.current?.select()
    }
  }

  function handleMinChange(e) {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2)
    onMinuteChange(val)
  }

  const inputStyle = {
    width: 64,
    height: 60,
    background: 'transparent',
    border: 'none',
    borderBottom: '3px solid var(--ink)',
    fontFamily: 'Nunito',
    fontSize: 44,
    fontWeight: 800,
    color: 'var(--ink)',
    textAlign: 'center',
    outline: 'none',
    letterSpacing: -1,
    caretColor: 'var(--red)',
    padding: 0,
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      background: 'transparent',
      border: '3.5px solid var(--ink)',
      borderRadius: 14,
      padding: '10px 20px 6px',
      boxShadow: '4px 4px 0 var(--ink)',
      gap: 0,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <input
          ref={hourRef}
          type="text"
          inputMode="numeric"
          placeholder="–"
          value={hourValue}
          onChange={handleHourChange}
          onKeyDown={handleHourKey}
          disabled={disabled}
          style={{ ...inputStyle, color: hourValue ? 'var(--ink)' : 'var(--grey)' }}
          maxLength={2}
        />
        <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--grey)', letterSpacing: '1px', textTransform: 'uppercase' }}>HH</span>
      </div>

      <span style={{ fontFamily: 'Bangers', fontSize: 48, color: 'var(--ink)', padding: '0 4px', marginBottom: 14, lineHeight: '48px' }}>:</span>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <input
          ref={minRef}
          type="text"
          inputMode="numeric"
          placeholder="–"
          value={minuteValue}
          onChange={handleMinChange}
          onKeyDown={handleMinKey}
          disabled={disabled}
          style={{ ...inputStyle, color: minuteValue ? 'var(--ink)' : 'var(--grey)' }}
          maxLength={2}
        />
        <span style={{ fontFamily: 'Nunito', fontSize: 10, fontWeight: 700, color: 'var(--grey)', letterSpacing: '1px', textTransform: 'uppercase' }}>MM</span>
      </div>
    </div>
  )
}
