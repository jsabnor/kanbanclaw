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

const jsonStorage: Storage = {
  async getAllTasks() {
    await ensureInit()
    const txt = await fs.readFile(tasksFile, 'utf8')
    return JSON.parse(txt) as Task[]
  }
}

export default jsonStorage
