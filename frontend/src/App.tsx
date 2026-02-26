import React, { useEffect, useState } from 'react'
import { HiSparkles, HiOutlineClock, HiOutlineCheck, HiSun, HiMoon } from 'react-icons/hi'
// Using native HTML5 Drag and Drop to avoid extra dependency

type Status = 'todo' | 'inprogress' | 'done'

type Task = {
  id: number
  title: string
  agent: string
  status: Status
}

function initials(name: string) {
  return name
    .split(' ')
    .map((s) => s[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

function statusColor(s: Status) {
  if (s === 'todo') return 'var(--todo)'
  if (s === 'inprogress') return 'var(--inprogress)'
  return 'var(--done)'
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('kanbanclaw:theme') as 'light' | 'dark' | null
    if (saved) setTheme(saved)
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('kanbanclaw:theme', theme)
  }, [theme])

  // Ensure avatar text color contrasts with avatar background.
  useEffect(() => {
    const root = getComputedStyle(document.documentElement)
    const bg = root.getPropertyValue('--avatar-bg').trim() || '#eef2ff'

    function hexToRgb(hex: string) {
      const h = hex.replace('#', '')
      const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      }
    }

    function luminance(r: number, g: number, b: number) {
      const a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
    }

    let rgb
    try {
      if (bg.startsWith('rgb')) {
        const parts = bg.replace(/rgba?\(|\)/g, '').split(',').map(s => Number(s.trim()))
        rgb = { r: parts[0], g: parts[1], b: parts[2] }
      } else {
        rgb = hexToRgb(bg)
      }
    } catch (e) {
      rgb = { r: 238, g: 242, b: 255 }
    }

    const lum = luminance(rgb.r, rgb.g, rgb.b)
    // wcag threshold for contrast with white is around 0.179
    const avatarText = lum > 0.5 ? '#0f172a' : '#e6f0ff'
    document.documentElement.style.setProperty('--avatar-foreground', avatarText)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then(setTasks)
      .catch(console.error)
  }, [])

  const columns: { key: Status; title: string; icon: React.ReactNode }[] = [
    { key: 'todo', title: 'To Do', icon: <HiSparkles /> },
    { key: 'inprogress', title: 'In Progress', icon: <HiOutlineClock /> },
    { key: 'done', title: 'Done', icon: <HiOutlineCheck /> }
  ]

  function handleDragStart(e: React.DragEvent, t: Task) {
    setDraggingId(t.id)
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: t.id, status: t.status }))
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e: React.DragEvent, col: Status) {
    e.preventDefault()
    setDragOverColumn(col)
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(e: React.DragEvent, destStatus: Status, destIndex?: number) {
    e.preventDefault()
    setDragOverColumn(null)
    const raw = e.dataTransfer.getData('text/plain')
    if (!raw) return
    let payload: { id: number; status: Status }
    try {
      payload = JSON.parse(raw)
    } catch {
      return
    }
    const { id, status: fromStatus } = payload

    if (fromStatus === destStatus) {
      // reorder within same column
      const items = tasks.filter((t) => t.status === fromStatus)
      const other = tasks.filter((t) => t.status !== fromStatus)
      const idx = items.findIndex((it) => it.id === id)
      if (idx === -1) return
      const [moved] = items.splice(idx, 1)
      const insertAt = typeof destIndex === 'number' ? destIndex : items.length
      items.splice(insertAt, 0, moved)
      setTasks([...other, ...items])
      return
    }

    // move between columns
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: destStatus } : t)))
    setDraggingId(null)
  }

  return (
    <div className="app">
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

      <main>
          <div className="board">
            {columns.map((col) => (
              <section
                className="column"
                key={col.key}
                onDragOver={(e) => handleDragOver(e, col.key)}
                onDrop={(e) => handleDrop(e, col.key)}
              >
                <div className="column-header">
                  <div className="column-title">
                    <span className="col-icon">{col.icon}</span>
                    <span>{col.title}</span>
                  </div>
                  <div className="column-count">{tasks.filter((t) => t.status === col.key).length}</div>
                </div>

                <div className={`cards ${tasks.filter((t) => t.status === col.key).length === 0 ? 'empty' : ''} ${dragOverColumn === col.key ? 'dropping' : ''}`}>
                  {tasks
                    .filter((t) => t.status === col.key)
                    .map((t, index) => (
                      <article
                        key={t.id}
                        className={`card ${draggingId === t.id ? 'dragging' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t)}
                        onDragEnd={() => setDraggingId(null)}
                      >
                        <div className="card-main">
                          {t.agent && t.agent.startsWith('http') ? (
                            <img className="avatar img" src={t.agent} alt={t.agent} />
                          ) : (
                            <div className="avatar" style={{ background: '#eef2ff' }}>{initials(t.agent)}</div>
                          )}
                          <div className="card-body">
                            <div className="card-title">{t.title}</div>
                            <div className="card-meta">
                              <span className="agent">{t.agent}</span>
                              <span className="status" style={{ background: statusColor(t.status) }}>{t.status}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </section>
            ))}
          </div>
      </main>
    </div>
  )
}
