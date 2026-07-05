import MonthGrid from './MonthGrid'
import { MONTH_LABELS, formatDateKey } from './calendarUtils'
import './YearView.css'
import './NavArrow.css'

function YearView({ habitData, cycleDay, year, onYearChange }) {
  const today = new Date()
  const todayKey = formatDateKey(today)
  const currentYear = today.getFullYear()
  const isCurrentYear = year >= currentYear

  function goToPreviousYear() {
    onYearChange(year - 1)
  }

  function goToNextYear() {
    if (!isCurrentYear) {
      onYearChange(year + 1)
    }
  }

  return (
    <div className="year-view">
      <div className="year-header">
        <button
          type="button"
          className="nav-arrow"
          onClick={goToPreviousYear}
          aria-label="Previous year"
        >
          &#8249;
        </button>

        <div className="year-label">{year}</div>

        <button
          type="button"
          className="nav-arrow"
          onClick={goToNextYear}
          disabled={isCurrentYear}
          aria-label="Next year"
        >
          &#8250;
        </button>
      </div>

      <div className="year-grid">
        {MONTH_LABELS.map((label, month) => (
          <div key={label} className="year-month">
            <h2 className="year-month-title">{label}</h2>
            <MonthGrid
              year={year}
              month={month}
              habitData={habitData}
              todayKey={todayKey}
              onDayClick={cycleDay}
              compact
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default YearView
