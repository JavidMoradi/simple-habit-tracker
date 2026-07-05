export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const SHORT_WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CELLS_PER_MONTH_VIEW = 42 // fixed 6 rows x 7 columns so every month renders at the same size

export function formatDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function buildMonthCells(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = firstOfMonth.getDay()

  const cells = new Array(leadingBlanks).fill(null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day))
  }
  while (cells.length < CELLS_PER_MONTH_VIEW) {
    cells.push(null)
  }
  return cells
}
