import jsonStorage from './storage/jsonStorage'
import sqliteStorage from './storage/sqliteStorage'
import { Storage, Task } from './storage/types'

const storageChoice = process.env.STORAGE || 'json'
let impl: Storage
if (storageChoice === 'sqlite') impl = sqliteStorage
else impl = jsonStorage

export async function getAllTasks(): Promise<Task[]> {
  return impl.getAllTasks()
}

export async function createTask(input: { title: string; agent?: string; status?: string }): Promise<Task> {
  return impl.createTask(input as any)
}

export async function updateTask(id: number, patch: Partial<Task>): Promise<Task | null> {
  return impl.updateTask(id, patch)
}

export async function deleteTask(id: number): Promise<boolean> {
  return impl.deleteTask(id)
}

export async function getAgents(): Promise<string[]> {
  return impl.getAgents()
}
