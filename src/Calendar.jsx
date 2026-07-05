import MonthGrid from './MonthGrid'
import { MONTH_LABELS, formatDateKey } from './calendarUtils'
import './Calendar.css'
import './NavArrow.css'

function Calendar({ habitData, cycleDay, viewDate, onViewDateChange }) {
  const todayKey = formatDateKey(new Date())
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  function goToPreviousMonth() {
    onViewDateChange(new Date(year, month - 1, 1))
  }

  function goToNextMonth() {
    onViewDateChange(new Date(year, month + 1, 1))
  }

  return (
    <div className="calendar-shell">
      <button
        type="button"
        className="nav-arrow"
        onClick={goToPreviousMonth}
        aria-label="Previous month"
      >
        &#8249;
      </button>

      <section className="calendar">
        <h1 className="calendar-title">
          {MONTH_LABELS[month]} {year}
        </h1>

        <MonthGrid
          year={year}
          month={month}
          habitData={habitData}
          todayKey={todayKey}
          onDayClick={cycleDay}
        />
      </section>

      <button
        type="button"
        className="nav-arrow"
        onClick={goToNextMonth}
        aria-label="Next month"
      >
        &#8250;
      </button>
    </div>
  )
}

export default Calendar
