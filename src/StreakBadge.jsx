import './StreakBadge.css'

function StreakBadge({ streak }) {
  return (
    <div
      className={`streak-badge${streak > 0 ? ' active' : ''}`}
      title={streak > 0 ? `${streak}-day streak` : 'No streak yet'}
    >
      <span className="streak-flame" aria-hidden="true">
        &#128293;
      </span>
      <span className="streak-count">{streak}</span>
    </div>
  )
}

export default StreakBadge
