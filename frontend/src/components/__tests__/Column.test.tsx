import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Column from '../Column'
import { Task } from '../../types'

const col = { key: 'todo' as const, title: 'To Do', icon: <span>•</span> }

describe('Column', () => {
  it('shows empty class when no tasks', () => {
    render(
      <Column col={col} tasks={[]} draggingId={null} onDragOver={() => {}} onDrop={() => {}} onDragStart={() => {}} />
    )
    const cards = document.querySelector('.cards')
    expect(cards).toHaveClass('empty')
  })

  it('renders tasks when provided', () => {
    const tasks: Task[] = [{ id: 1, title: 'X', agent: 'Z', status: 'todo' }]
    render(
      <Column col={col} tasks={tasks} draggingId={null} onDragOver={() => {}} onDrop={() => {}} onDragStart={() => {}} />
    )
    expect(screen.getByText('X')).toBeInTheDocument()
  })
})
