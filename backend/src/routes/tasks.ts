import { Router } from 'express'
import { getAllTasks } from '../db'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

export default router
