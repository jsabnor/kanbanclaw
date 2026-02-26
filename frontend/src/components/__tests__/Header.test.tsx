import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Header from '../Header'

describe('Header', () => {
  it('renders brand and toggles theme', async () => {
    const toggle = vi.fn()
    render(<Header theme="light" toggleTheme={toggle} />)
    expect(screen.getByText('kanbanclaw')).toBeInTheDocument()
    const btn = screen.getByRole('button', { name: /toggle theme/i })
    await userEvent.click(btn)
    expect(toggle).toHaveBeenCalled()
  })
})
