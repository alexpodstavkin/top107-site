'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'zc_seats_v1'
const TICK_SECONDS = 10
const START = 35
const MIN = 5
const TOTAL = 200

type Stored = { seats: number; since: number }

function readStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed.seats === 'number' &&
      typeof parsed.since === 'number'
    ) {
      return parsed
    }
  } catch {}
  return null
}

function writeStored(data: Stored) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function compute(stored: Stored | null): { seats: number; since: number } {
  if (!stored) {
    return { seats: START, since: Date.now() }
  }
  const ticks = Math.floor((Date.now() - stored.since) / (TICK_SECONDS * 1000))
  const seats = Math.max(MIN, stored.seats - ticks)
  return { seats, since: stored.since }
}

export default function SeatsCounter() {
  // Placeholder on SSR — replaced on client to avoid hydration mismatch.
  const [seats, setSeats] = useState<number>(START)

  useEffect(() => {
    // Initialize or recover from storage
    let stored = readStored()
    if (!stored) {
      stored = { seats: START, since: Date.now() }
      writeStored(stored)
    }
    const initial = compute(stored)
    setSeats(initial.seats)

    // Tick every second to keep UI close to wall-clock; recompute on each tick.
    const id = setInterval(() => {
      const cur = readStored() ?? stored!
      const next = compute(cur)
      setSeats(next.seats)
    }, 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="seats-counter" suppressHydrationWarning>
      <span className="seats-counter-dot" aria-hidden />
      <span className="seats-counter-label">Свободных мест осталось</span>
      <span className="seats-counter-value">
        <span className="seats-counter-num">{seats}</span>
        <span className="seats-counter-sep">/</span>
        <span className="seats-counter-total">{TOTAL}</span>
      </span>
    </div>
  )
}
