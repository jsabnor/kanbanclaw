import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '../Avatar'

describe('Avatar', () => {
  it('renders initials for a name', () => {
    render(<Avatar agent="Jose Maria" />)
    expect(screen.getByText('JM')).toBeInTheDocument()
  })
})
