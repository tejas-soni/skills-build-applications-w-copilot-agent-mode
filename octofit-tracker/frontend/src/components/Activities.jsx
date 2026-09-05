import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(apiEndpoint, controller.signal)
      .then(setActivities)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [])

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Recent activities</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="table-responsive surface">
        <table className="table align-middle mb-0">
          <thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td><strong>{activity.type}</strong></td>
                <td>{activity.user?.name ?? 'Unassigned'}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.calories ?? '-'} kcal</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities