import express from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/tasks', tasksRouter)

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(PORT, () => {
  console.log(`kanbanclaw backend listening on http://localhost:${PORT}`)
})
