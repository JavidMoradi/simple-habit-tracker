import { useHabitData } from './useHabitData'
import './Calendar.css'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function buildMonthCells(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()

  const cells = []
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }
  return cells
}

function Calendar() {
  const { habitData, cycleDay } = useHabitData()

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayKey = formatDateKey(today)
  const cells = buildMonthCells(year, month)

  return (
    <section className="calendar">
      <h1 className="calendar-title">
        {MONTH_LABELS[month]} {year}
      </h1>

      <div className="calendar-grid">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="weekday-label">
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
              onClick={() => cycleDay(dateKey)}
              aria-label={`${MONTH_LABELS[month]} ${date.getDate()}, ${year}`}
            >
              <span className={`day-circle${state ? ` ${state}` : ''}`}>
                {date.getDate()}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default Calendar
