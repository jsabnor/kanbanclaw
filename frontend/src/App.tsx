import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import { Status, Task } from './types'

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
      const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
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
        const parts = bg.replace(/rgba?\(|\)/g, '').split(',').map((s) => Number(s.trim()))
        rgb = { r: parts[0], g: parts[1], b: parts[2] }
      } else {
        rgb = hexToRgb(bg)
      }
    } catch (e) {
      rgb = { r: 238, g: 242, b: 255 }
    }

    const lum = luminance(rgb.r, rgb.g, rgb.b)
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

    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: destStatus } : t)))
    setDraggingId(null)
  }

  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Board tasks={tasks} draggingId={draggingId} onDragOver={handleDragOver} onDrop={handleDrop} onDragStart={handleDragStart} />
      </main>
    </div>
  )
}
