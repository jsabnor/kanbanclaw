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
