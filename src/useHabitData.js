import { useEffect, useState } from 'react'

const STORAGE_KEY = 'habit-tracker-data'
const STATE_CYCLE = ['green', 'yellow', 'red']

function loadHabitData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useHabitData() {
  const [habitData, setHabitData] = useState(loadHabitData)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habitData))
  }, [habitData])

  function cycleDay(dateKey) {
    setHabitData((prev) => {
      const currentIndex = STATE_CYCLE.indexOf(prev[dateKey])
      const nextState = STATE_CYCLE[currentIndex + 1]

      if (!nextState) {
        const { [dateKey]: _removed, ...rest } = prev
        return rest
      }

      return { ...prev, [dateKey]: nextState }
    })
  }

  return { habitData, cycleDay }
}
