import { useEffect, useState } from 'react'

const STORE_KEY = 'habit-tracker-store'
const LEGACY_DATA_KEY = 'habit-tracker-data'
const STATE_CYCLE = ['green', 'yellow', 'red']

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function createDefaultStore() {
  const id = createId()
  return {
    habits: [{ id, name: 'My Habit' }],
    activeHabitId: id,
    progress: { [id]: {} },
  }
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    return createDefaultStore()
  }

  // Migrate data saved before multiple habits were supported.
  try {
    const legacyRaw = localStorage.getItem(LEGACY_DATA_KEY)
    if (legacyRaw) {
      const legacyData = JSON.parse(legacyRaw)
      const id = createId()
      return {
        habits: [{ id, name: 'My Habit' }],
        activeHabitId: id,
        progress: { [id]: legacyData },
      }
    }
  } catch {
    return createDefaultStore()
  }

  return createDefaultStore()
}

export function useHabitStore() {
  const [store, setStore] = useState(loadStore)

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store))
  }, [store])

  function selectHabit(habitId) {
    setStore((prev) => ({ ...prev, activeHabitId: habitId }))
  }

  function addHabit(name) {
    const trimmedName = name.trim()
    if (!trimmedName) {
      return
    }

    const id = createId()
    setStore((prev) => ({
      habits: [...prev.habits, { id, name: trimmedName }],
      activeHabitId: id,
      progress: { ...prev.progress, [id]: {} },
    }))
  }

  function removeHabit(habitId) {
    setStore((prev) => {
      if (prev.habits.length <= 1) {
        return prev
      }

      const habits = prev.habits.filter((habit) => habit.id !== habitId)
      const progress = { ...prev.progress }
      delete progress[habitId]

      const activeHabitId =
        prev.activeHabitId === habitId ? habits[0].id : prev.activeHabitId

      return { habits, activeHabitId, progress }
    })
  }

  function cycleDay(dateKey) {
    setStore((prev) => {
      const activeProgress = prev.progress[prev.activeHabitId] || {}
      const currentIndex = STATE_CYCLE.indexOf(activeProgress[dateKey])
      const nextState = STATE_CYCLE[currentIndex + 1]

      const nextProgress = { ...activeProgress }
      if (nextState) {
        nextProgress[dateKey] = nextState
      } else {
        delete nextProgress[dateKey]
      }

      return {
        ...prev,
        progress: { ...prev.progress, [prev.activeHabitId]: nextProgress },
      }
    })
  }

  return {
    habits: store.habits,
    activeHabitId: store.activeHabitId,
    habitData: store.progress[store.activeHabitId] || {},
    selectHabit,
    addHabit,
    removeHabit,
    cycleDay,
  }
}
