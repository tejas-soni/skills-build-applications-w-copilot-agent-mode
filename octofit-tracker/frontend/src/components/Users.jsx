import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(apiEndpoint, controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section><div className="page-heading"><div><p className="eyebrow">Your training circle</p><h1>Athletes</h1></div><span className="count-badge">{users.length} profiles</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="resource-grid">{users.map((user) => <article className="surface user-card" key={user._id}><div className="avatar avatar-large">{user.avatar ?? user.name?.slice(0, 2).toUpperCase()}</div><div><h2>{user.name}</h2><p>{user.email}</p></div><div className="goals">{user.goals?.map((goal) => <span key={goal}>{goal}</span>)}</div></article>)}</div></section>
  )
}

export default Users