import { promises as fs } from 'fs'
import path from 'path'
import { Task, Storage } from './types'

const dataDir = path.resolve(__dirname, '..', 'data')
const tasksFile = path.join(dataDir, 'tasks.json')

async function ensureInit() {
  await fs.mkdir(dataDir, { recursive: true })
  try {
    await fs.access(tasksFile)
  } catch (e) {
    const initial: Task[] = [
      { id: 1, title: 'Investigar fallo en login', agent: 'Ana', status: 'todo' },
      { id: 2, title: 'Actualizar inventario', agent: 'Luis', status: 'inprogress' },
      { id: 3, title: 'Deploy versión 1.2', agent: 'Marta', status: 'done' }
    ]
    await fs.writeFile(tasksFile, JSON.stringify(initial, null, 2), 'utf8')
  }
}

async function readTasks(): Promise<Task[]> {
  await ensureInit()
  const txt = await fs.readFile(tasksFile, 'utf8')
  return JSON.parse(txt) as Task[]
}

async function writeTasks(tasks: Task[]) {
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), 'utf8')
}

const jsonStorage: Storage = {
  async getAllTasks() {
    return readTasks()
  },

  async createTask(input) {
    const tasks = await readTasks()
    const maxId = tasks.reduce((m, t) => Math.max(m, t.id), 0)
    const next = maxId + 1
    const newTask: Task = {
      id: next,
      title: input.title,
      agent: input.agent || '',
      status: (input.status as string) || 'backlog'
    }
    tasks.push(newTask)
    await writeTasks(tasks)
    return newTask
  },

  async updateTask(id) {
    const patch = arguments[1] as Partial<Task>
    const tasks = await readTasks()
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx === -1) return null
    const updated = { ...tasks[idx], ...patch }
    tasks[idx] = updated
    await writeTasks(tasks)
    return updated
  },

  async deleteTask(id) {
    const tasks = await readTasks()
    const filtered = tasks.filter((t) => t.id !== id)
    if (filtered.length === tasks.length) return false
    await writeTasks(filtered)
    return true
  },

  async getAgents() {
    const tasks = await readTasks()
    const set = new Set<string>()
    tasks.forEach((t) => { if (t.agent) set.add(t.agent) })
    return Array.from(set)
  }
}

export default jsonStorage
