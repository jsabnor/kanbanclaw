import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Board from '../Board'
import { Task } from '../../types'

const tasks: Task[] = [
  { id: 1, title: 'A', agent: 'Alice', status: 'todo' },
  { id: 2, title: 'B', agent: 'Bob', status: 'inprogress' },
  { id: 3, title: 'C', agent: 'Caro', status: 'done' }
]

describe('Board', () => {
  it('renders columns and tasks', async () => {
    // mock fetch for columns
    const mock = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([{ key: 'todo', title: 'To Do' }, { key: 'inprogress', title: 'In Progress' }, { key: 'done', title: 'Done' }]) })
    )
    // @ts-ignore global fetch
    global.fetch = mock

    render(<Board tasks={tasks} draggingId={null} onDragOver={() => {}} onDrop={() => {}} onDragStart={() => {}} />)

    expect(await screen.findByText('To Do')).toBeInTheDocument()
    expect(await screen.findByText('In Progress')).toBeInTheDocument()
    expect(await screen.findByText('Done')).toBeInTheDocument()
    // check agent names (unique) instead of initials which may appear twice
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Caro')).toBeInTheDocument()
    // restore global.fetch
    // @ts-ignore
    global.fetch = undefined
  })
})
