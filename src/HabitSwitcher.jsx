import { useState } from 'react'
import './HabitSwitcher.css'

function HabitSwitcher({ habits, activeHabitId, onSelectHabit, onAddHabit, onRemoveHabit }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newHabitName, setNewHabitName] = useState('')
  const activeHabit = habits.find((habit) => habit.id === activeHabitId)

  function handleRemove() {
    if (habits.length <= 1) {
      return
    }
    if (window.confirm(`Delete "${activeHabit?.name}" and all its tracked progress?`)) {
      onRemoveHabit(activeHabitId)
    }
  }

  function startAdding() {
    setNewHabitName('')
    setIsAdding(true)
  }

  function cancelAdding() {
    setIsAdding(false)
    setNewHabitName('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    onAddHabit(newHabitName)
    setIsAdding(false)
    setNewHabitName('')
  }

  if (isAdding) {
    return (
      <form className="habit-switcher" onSubmit={handleSubmit}>
        <input
          type="text"
          className="habit-name-input"
          value={newHabitName}
          onChange={(event) => setNewHabitName(event.target.value)}
          placeholder="Habit name"
          autoFocus
        />
        <button type="submit" className="habit-add-confirm">
          Add
        </button>
        <button type="button" className="habit-add-cancel" onClick={cancelAdding}>
          Cancel
        </button>
      </form>
    )
  }

  return (
    <div className="habit-switcher">
      <select
        className="habit-select"
        value={activeHabitId}
        onChange={(event) => onSelectHabit(event.target.value)}
        aria-label="Select habit"
      >
        {habits.map((habit) => (
          <option key={habit.id} value={habit.id}>
            {habit.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="habit-add-button"
        onClick={startAdding}
        aria-label="Add new habit"
      >
        +
      </button>

      <button
        type="button"
        className="habit-remove-button"
        onClick={handleRemove}
        disabled={habits.length <= 1}
        aria-label="Remove selected habit"
      >
        &#8722;
      </button>
    </div>
  )
}

export default HabitSwitcher
