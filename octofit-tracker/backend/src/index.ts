import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/Activity.js'
import { Leaderboard } from './models/Leaderboard.js'
import { Team } from './models/Team.js'
import { User } from './models/User.js'
import { Workout } from './models/Workout.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }))
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members captain').sort({ name: 1 }))
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }))
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user').sort({ points: -1 }))
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().populate('recommendedFor').sort({ title: 1 }))
})

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiUrl}`)
    })
  } catch (error) {
    console.error('Error connecting to octofit_db:', error)
    process.exitCode = 1
  }
}

startServer()