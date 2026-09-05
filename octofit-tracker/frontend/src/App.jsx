import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Athletes', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <div className="overview-copy">
        <p className="eyebrow">The daily training desk</p>
        <h1>Make progress<br /><em>visible.</em></h1>
        <p className="lead">A focused home for the small wins that add up: log movement, find your people, and keep the next workout close.</p>
        <Link className="btn btn-dark rounded-0 px-4 py-3" to="/activities">View activity log <span aria-hidden="true">→</span></Link>
      </div>
      <div className="overview-aside">
        <div className="pulse-mark" aria-hidden="true"><span>O</span></div>
        <p className="eyebrow">OctoFit / 2026</p>
        <h2>Consistency<br />beats intensity.</h2>
        <p>Use the navigation to explore the live tracker data from your API.</p>
      </div>
      <div className="quick-links">
        <span>Jump in</span>
        <Link to="/leaderboard">See who's leading <span>↗</span></Link>
        <Link to="/workouts">Find a workout <span>↗</span></Link>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/"><span className="brand-dot">✳</span><span>OctoFit</span></Link>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}
        </nav>
        <span className="status-pill"><span /> API online</span>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </main>
    </div>
  )
}

export default App