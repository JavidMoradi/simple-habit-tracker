import HabitSwitcher from './HabitSwitcher'
import './Navbar.css'

function Navbar({
  viewMode,
  onViewModeChange,
  onTodayClick,
  habits,
  activeHabitId,
  onSelectHabit,
  onAddHabit,
  onRemoveHabit,
}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Your simple habit tracker!</span>
        <HabitSwitcher
          habits={habits}
          activeHabitId={activeHabitId}
          onSelectHabit={onSelectHabit}
          onAddHabit={onAddHabit}
          onRemoveHabit={onRemoveHabit}
        />
      </div>

      <div className="navbar-controls">
        <button type="button" className="today-button" onClick={onTodayClick}>
          Today
        </button>

        <div className="view-switch" role="group" aria-label="View mode">
          <button
            type="button"
            className={`view-switch-option${viewMode === 'month' ? ' active' : ''}`}
            onClick={() => onViewModeChange('month')}
          >
            Month
          </button>
          <button
            type="button"
            className={`view-switch-option${viewMode === 'annual' ? ' active' : ''}`}
            onClick={() => onViewModeChange('annual')}
          >
            Annual
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
