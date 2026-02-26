import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../app'

describe('GET /api/tasks', () => {
  it('returns json array of tasks', async () => {
    const res = await request(app).get('/api/tasks')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
