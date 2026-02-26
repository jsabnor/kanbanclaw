import React from 'react'
import { HiSparkles, HiMoon, HiSun } from 'react-icons/hi'

type Props = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Header({ theme, toggleTheme }: Props) {
  return (
    <header className="app-header">
      <div className="brand">
        <HiSparkles className="brand-icon" />
        <div>
          <div className="brand-title">kanbanclaw</div>
          <div className="brand-sub">Kanban de tareas de agentes</div>
        </div>
      </div>

      <div className="controls">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <HiMoon /> : <HiSun />}
        </button>
      </div>
    </header>
  )
}
