import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Board from '../Board'
import { Task } from '../../types'

const tasks: Task[] = [
  { id: 1, title: 'A', agent: 'Alice', status: 'todo' },
  { id: 2, title: 'B', agent: 'Bob', status: 'inprogress' },
  { id: 3, title: 'C', agent: 'Caro', status: 'done' }
]

describe('Board', () => {
  it('renders columns and tasks', () => {
    render(<Board tasks={tasks} draggingId={null} onDragOver={() => {}} onDrop={() => {}} onDragStart={() => {}} />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    // check agent names (unique) instead of initials which may appear twice
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Caro')).toBeInTheDocument()
  })
})
