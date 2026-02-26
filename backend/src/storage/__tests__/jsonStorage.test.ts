import { describe, it, expect } from 'vitest'
import jsonStorage from '../jsonStorage'
import fs from 'fs'
import path from 'path'

describe('jsonStorage', () => {
  const dataDir = path.resolve(__dirname, '..', '..', 'data')
  const tasksFile = path.join(dataDir, 'tasks.json')

  it('creates tasks.json and returns an array', async () => {
    // remove file if exists to test init
    try {
      await fs.promises.unlink(tasksFile)
    } catch {}

    const tasks = await jsonStorage.getAllTasks()
    expect(Array.isArray(tasks)).toBe(true)
    // file should now exist
    const exists = fs.existsSync(tasksFile)
    expect(exists).toBe(true)
  })
})
