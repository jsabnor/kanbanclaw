import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from '../Card'
import { Task } from '../../types'

const sample: Task = { id: 1, title: 'Test task', agent: 'Ana', status: 'todo' }

describe('Card', () => {
  it('renders title and agent', () => {
    render(<Card t={sample} draggingId={null} onDragStart={() => {}} onDragEnd={() => {}} />)
    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.getByText('Ana')).toBeInTheDocument()
  })
})
