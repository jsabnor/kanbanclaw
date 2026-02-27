import { Router } from 'express'

const router = Router()

// Return active columns configuration. Backend controls available columns.
router.get('/', (req, res) => {
  const cols = [
    { key: 'backlog', title: 'Backlog' },
    { key: 'todo', title: 'To Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'done', title: 'Done' }
  ]
  res.json(cols)
})

export default router
