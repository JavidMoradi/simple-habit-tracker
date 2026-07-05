import { useState } from 'react'
import Navbar from './Navbar'
import Calendar from './Calendar'
import YearView from './YearView'
import { useHabitStore } from './useHabitStore'
import { calculateStreak } from './streakUtils'

function App() {
  const [viewMode, setViewMode] = useState('month')
  const { habits, activeHabitId, habitData, selectHabit, addHabit, removeHabit, cycleDay } =
    useHabitStore()
  const streak = calculateStreak(habitData)
  const [monthViewDate, setMonthViewDate] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [annualViewYear, setAnnualViewYear] = useState(() => new Date().getFullYear())

  function goToToday() {
    const today = new Date()
    if (viewMode === 'month') {
      setMonthViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    } else {
      setAnnualViewYear(today.getFullYear())
    }
  }

  return (
    <>
      <Navbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onTodayClick={goToToday}
        habits={habits}
        activeHabitId={activeHabitId}
        onSelectHabit={selectHabit}
        onAddHabit={addHabit}
        onRemoveHabit={removeHabit}
        streak={streak}
      />
      {viewMode === 'month' ? (
        <Calendar
          habitData={habitData}
          cycleDay={cycleDay}
          viewDate={monthViewDate}
          onViewDateChange={setMonthViewDate}
        />
      ) : (
        <YearView
          habitData={habitData}
          cycleDay={cycleDay}
          year={annualViewYear}
          onYearChange={setAnnualViewYear}
        />
      )}
    </>
  )
}

export default App
