import { Storage, Task } from './types'

// Placeholder adapter for SQLite. Not implemented here to avoid native build
// requirements. Implement this with the DB library of your choice when
// native builds or proper SQLite installation are acceptable.

const sqliteStorage: Storage = {
  async getAllTasks(): Promise<Task[]> {
    throw new Error('SQLite storage not implemented in this build. Set STORAGE=json to use JSON storage.')
  }
}

export default sqliteStorage
