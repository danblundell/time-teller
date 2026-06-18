import { useState, useCallback, useEffect } from 'react'
import { randomTime, checkAnswer } from './utils/timeUtils'
import WelcomeScreen from './components/WelcomeScreen'
import GameScreen from './components/GameScreen'
import WonScreen from './components/WonScreen'

const TOTAL_QUESTIONS = 10
const MAX_ATTEMPTS = 3
const GEM_TABLE = { 1: 12, 2: 8, 3: 4 } // attempts used → gems

function initialGameState() {
  return {
    phase: 'welcome',          // welcome | playing | correct | tryAgain | won
    questionNumber: 1,
    currentTime: randomTime(),
    attemptsLeft: MAX_ATTEMPTS,
    attemptsUsed: 0,           // wrong attempts on current question
    score: 0,
    gems: 0,
    gemsEarned: 0,             // gems for the current question (shown in overlay)
    hourInput: '',
    minuteInput: '',
  }
}

export default function App() {
  const [state, setState] = useState(initialGameState)

  const advanceQuestion = useCallback((currentState) => {
    const next = currentState.questionNumber + 1
    if (next > TOTAL_QUESTIONS) {
      setState(s => ({ ...s, phase: 'won' }))
    } else {
      setState(s => ({
        ...s,
        phase: 'playing',
        questionNumber: next,
        currentTime: randomTime(s.currentTime),
        attemptsLeft: MAX_ATTEMPTS,
        attemptsUsed: 0,
        hourInput: '',
        minuteInput: '',
      }))
    }
  }, [])

  const handleSubmit = useCallback(() => {
    setState(current => {
      if (current.phase !== 'playing') return current

      const correct = checkAnswer(current.hourInput, current.minuteInput, current.currentTime)

      if (correct) {
        const attemptsUsed = current.attemptsUsed + 1
        const earned = GEM_TABLE[attemptsUsed] ?? 0
        return {
          ...current,
          phase: 'correct',
          score: current.score + 1,
          gems: current.gems + earned,
          gemsEarned: earned,
        }
      }

      // Wrong answer
      const newAttemptsLeft = current.attemptsLeft - 1
      return {
        ...current,
        phase: 'tryAgain',
        attemptsLeft: newAttemptsLeft,
        attemptsUsed: current.attemptsUsed + 1,
        hourInput: '',
        minuteInput: '',
      }
    })
  }, [])

  // Auto-dismiss overlays
  useEffect(() => {
    if (state.phase === 'correct') {
      const t = setTimeout(() => advanceQuestion(state), 1800)
      return () => clearTimeout(t)
    }
    if (state.phase === 'tryAgain') {
      const outOfAttempts = state.attemptsLeft === 0
      const delay = outOfAttempts ? 2000 : 1500
      const t = setTimeout(() => {
        if (outOfAttempts) {
          advanceQuestion(state)
        } else {
          setState(s => ({ ...s, phase: 'playing' }))
        }
      }, delay)
      return () => clearTimeout(t)
    }
  }, [state.phase, state.attemptsLeft, state.questionNumber])

  if (state.phase === 'welcome') {
    return <WelcomeScreen onStart={() => setState(s => ({ ...s, phase: 'playing' }))} />
  }

  if (state.phase === 'won') {
    return (
      <WonScreen
        score={state.score}
        totalQuestions={TOTAL_QUESTIONS}
        gems={state.gems}
        maxGems={TOTAL_QUESTIONS * 12}
        onPlayAgain={() => setState(initialGameState())}
      />
    )
  }

  return (
    <GameScreen
      phase={state.phase}
      questionNumber={state.questionNumber}
      totalQuestions={TOTAL_QUESTIONS}
      currentTime={state.currentTime}
      score={state.score}
      attemptsLeft={state.attemptsLeft}
      gems={state.gems}
      hourInput={state.hourInput}
      minuteInput={state.minuteInput}
      onHourChange={v => setState(s => ({ ...s, hourInput: v }))}
      onMinuteChange={v => setState(s => ({ ...s, minuteInput: v }))}
      onSubmit={handleSubmit}
      gemsEarned={state.gemsEarned}
    />
  )
}
