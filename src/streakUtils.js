import { formatDateKey } from './calendarUtils'

// Consecutive tracked days ending today, or ending yesterday if today
// hasn't been marked yet (mirrors Duolingo: the streak stays alive
// until the day actually passes without activity).
export function calculateStreak(habitData) {
  const cursor = new Date()

  if (!habitData[formatDateKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1)
  }

  let streak = 0
  while (habitData[formatDateKey(cursor)]) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}
