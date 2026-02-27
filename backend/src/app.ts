import express from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks'
import columnsRouter from './routes/columns'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/tasks', tasksRouter)
app.use('/api/columns', columnsRouter)

export default app
