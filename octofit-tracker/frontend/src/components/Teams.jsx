import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(apiEndpoint, controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section><div className="page-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="resource-grid">{teams.map((team) => <article className="surface resource-card" key={team._id}><div className="team-mark">{team.name?.slice(0, 2).toUpperCase()}</div><h2>{team.name}</h2><p>{team.description}</p><footer>{team.members?.length ?? 0} members <span>Captain: {team.captain?.name ?? 'TBD'}</span></footer></article>)}</div></section>
  )
}

export default Teams