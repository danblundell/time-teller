import { hourAngle, minuteAngle, handEndpoint } from '../utils/timeUtils'

const CX = 150
const CY = 150
const R_RIM = 138
const R_FACE = 124
const R_NUM = 98
const HOUR_LEN = 72
const MIN_LEN = 96

const NUMBERS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function tickEndpoints(angleDeg, outer, inner) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x1: CX + outer * Math.cos(rad),
    y1: CY + outer * Math.sin(rad),
    x2: CX + inner * Math.cos(rad),
    y2: CY + inner * Math.sin(rad),
  }
}

export default function ClockFace({ time, size = 280 }) {
  const hAngle = hourAngle(time)
  const mAngle = minuteAngle(time)
  const hourEnd = handEndpoint(CX, CY, hAngle, HOUR_LEN)
  const minEnd = handEndpoint(CX, CY, mAngle, MIN_LEN)

  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Drop shadow */}
      <circle cx={CX + 5} cy={CY + 5} r={R_RIM} fill="rgba(0,0,0,0.12)" />
      {/* Red rim */}
      <circle cx={CX} cy={CY} r={R_RIM} fill="var(--red)" stroke="var(--ink)" strokeWidth={4} />
      {/* White face */}
      <circle cx={CX} cy={CY} r={R_FACE} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />

      {/* Tick marks — 12 major, 48 minor */}
      {Array.from({ length: 60 }, (_, i) => {
        const angle = i * 6
        const isMajor = i % 5 === 0
        const { x1, y1, x2, y2 } = tickEndpoints(angle, 122, isMajor ? 110 : 116)
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--ink)"
            strokeWidth={isMajor ? 3 : 1.5}
            strokeLinecap="round"
          />
        )
      })}

      {/* Numbers */}
      {NUMBERS.map((n, i) => {
        const angleDeg = i * 30
        const rad = (angleDeg - 90) * (Math.PI / 180)
        const x = CX + R_NUM * Math.cos(rad)
        const y = CY + R_NUM * Math.sin(rad)
        return (
          <text
            key={n}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Bangers"
            fontSize="22px"
            fill="var(--ink)"
          >
            {n}
          </text>
        )
      })}

      {/* Hour hand */}
      <line
        x1={CX} y1={CY}
        x2={hourEnd.x} y2={hourEnd.y}
        stroke="var(--ink)"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={CX} y1={CY}
        x2={minEnd.x} y2={minEnd.y}
        stroke="var(--ink)"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* Centre pin */}
      <circle cx={CX} cy={CY} r={8} fill="var(--red)" stroke="var(--ink)" strokeWidth={2.5} />
    </svg>
  )
}
