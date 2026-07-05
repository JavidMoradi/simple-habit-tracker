import { MONTH_LABELS, SHORT_WEEKDAY_LABELS, WEEKDAY_LABELS, buildMonthCells, formatDateKey } from './calendarUtils'
import './MonthGrid.css'

function MonthGrid({ year, month, habitData, todayKey, onDayClick, compact = false }) {
  const cells = buildMonthCells(year, month)
  const weekdayLabels = compact ? SHORT_WEEKDAY_LABELS : WEEKDAY_LABELS

  return (
    <div className={`month-grid${compact ? ' compact' : ''}`}>
      {weekdayLabels.map((label, index) => (
        <div key={`${label}-${index}`} className="weekday-label">
          {label}
        </div>
      ))}

      {cells.map((date, index) => {
        if (!date) {
          return <div key={`blank-${index}`} className="day-cell empty" />
        }

        const dateKey = formatDateKey(date)
        const state = habitData[dateKey]

        return (
          <button
            key={dateKey}
            type="button"
            className={`day-cell${dateKey === todayKey ? ' today' : ''}`}
            onClick={() => onDayClick(dateKey)}
            aria-label={`${MONTH_LABELS[month]} ${date.getDate()}, ${year}`}
          >
            <span className={`day-circle${state ? ` ${state}` : ''}`}>
              {date.getDate()}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default MonthGrid
