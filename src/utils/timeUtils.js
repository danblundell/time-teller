const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

export function randomTime(exclude = null) {
  let hours, minutes
  do {
    hours = Math.floor(Math.random() * 12) + 1
    minutes = MINUTES[Math.floor(Math.random() * MINUTES.length)]
  } while (exclude && exclude.hours === hours && exclude.minutes === minutes)
  return { hours, minutes }
}

export function formatTime({ hours, minutes }) {
  return `${hours}:${String(minutes).padStart(2, '0')}`
}

// Returns { x, y } endpoint for a clock hand given angle from 12 o'clock (degrees),
// the clock center, and hand length.
export function handEndpoint(cx, cy, angleDeg, length) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: cx + length * Math.cos(rad),
    y: cy + length * Math.sin(rad),
  }
}

export function hourAngle({ hours, minutes }) {
  return (hours % 12) * 30 + minutes * 0.5
}

export function minuteAngle({ minutes }) {
  return minutes * 6
}

export function checkAnswer(hourInput, minuteInput, currentTime) {
  const h = parseInt(hourInput, 10)
  const m = parseInt(minuteInput, 10)
  if (isNaN(h) || isNaN(m)) return false
  return h === currentTime.hours && m === currentTime.minutes
}
