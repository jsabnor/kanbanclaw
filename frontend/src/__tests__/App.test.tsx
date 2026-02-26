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
    global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve(sample) }))
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
