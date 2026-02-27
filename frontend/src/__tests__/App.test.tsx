import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../App'

const sample = [
  { id: 1, title: 'Task A', agent: 'Anna', status: 'todo' }
]

describe('App', () => {
  let originalFetch: any
  beforeEach(() => {
    originalFetch = global.fetch
    global.fetch = vi.fn((input: RequestInfo) => {
      const url = typeof input === 'string' ? input : String((input as any).url)
      if (url.includes('/api/columns')) {
        return Promise.resolve({ json: () => Promise.resolve([{ key: 'todo', title: 'To Do' }, { key: 'inprogress', title: 'In Progress' }, { key: 'done', title: 'Done' }]) })
      }
      if (url.includes('/api/tasks/agents')) {
        return Promise.resolve({ json: () => Promise.resolve([]) })
      }
      return Promise.resolve({ json: () => Promise.resolve(sample) })
    })
  })
  afterEach(() => {
    global.fetch = originalFetch
  })

  it('fetches tasks and renders them', async () => {
    render(<App />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
    expect(await screen.findByText('Task A')).toBeInTheDocument()
  })
})
