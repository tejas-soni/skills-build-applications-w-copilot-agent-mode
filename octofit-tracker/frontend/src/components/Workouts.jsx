import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(apiEndpoint, controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section><div className="page-heading"><div><p className="eyebrow">Curated for you</p><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="resource-grid">{workouts.map((workout) => <article className="surface resource-card workout-card" key={workout._id}><div className="workout-top"><span className="category-label">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.difficulty} · {workout.exercises?.length ?? 0} exercises</p><ul>{workout.exercises?.slice(0, 3).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></section>
  )
}

export default Workouts