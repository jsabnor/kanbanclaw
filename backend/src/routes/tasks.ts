import { Router } from 'express'
import { getAllTasks, createTask, updateTask, deleteTask, getAgents } from '../db'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, agent, status } = req.body
    if (!title) return res.status(400).json({ error: 'title required' })
    const created = await createTask({ title, agent, status })
    res.status(201).json(created)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const patch = req.body
    const updated = await updateTask(id, patch)
    if (!updated) return res.status(404).json({ error: 'not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const ok = await deleteTask(id)
    if (!ok) return res.status(404).json({ error: 'not found' })
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

router.get('/agents', async (req, res) => {
  try {
    const agents = await getAgents()
    res.json(agents)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})

export default router
