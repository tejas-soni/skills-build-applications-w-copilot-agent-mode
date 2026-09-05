import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(apiEndpoint, controller.signal).then(setEntries).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">Team challenge</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} ranked</span></div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="rank-list">
        {entries.map((entry, index) => <article className="rank-row surface" key={entry._id}><span className="rank-number">{String(index + 1).padStart(2, '0')}</span><div className="avatar">{entry.user?.avatar ?? '?'}</div><div className="rank-copy"><strong>{entry.user?.name ?? 'Unknown athlete'}</strong><small>{entry.workoutsCompleted ?? 0} workouts · {entry.currentStreak ?? 0} day streak</small></div><strong className="points">{entry.points ?? 0}<small> pts</small></strong></article>)}
      </div>
    </section>
  )
}

export default Leaderboard