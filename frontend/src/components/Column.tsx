import React from 'react'
import { Status, Task } from '../types'
import Card from './Card'

type Col = { key: Status; title: string; icon: React.ReactNode }

type Props = {
  col: Col
  tasks: Task[]
  draggingId: number | null
  onDragOver: (e: React.DragEvent, col: Status) => void
  onDrop: (e: React.DragEvent, destStatus: Status, destIndex?: number) => void
  onDragStart: (e: React.DragEvent, t: Task) => void
  onCreate?: (status: string) => void
  onEdit?: (t: Task) => void
  onDelete?: (id: number) => void
}

export default function Column({ col, tasks, draggingId, onDragOver, onDrop, onDragStart, onCreate, onEdit, onDelete }: Props) {
  const empty = tasks.length === 0

  return (
    <section className="column" onDragOver={(e) => onDragOver(e, col.key)} onDrop={(e) => onDrop(e, col.key)}>
      <div className="column-header">
        <div className="column-title">
          <span className="col-icon">{col.icon}</span>
          <span>{col.title}</span>
        </div>
        <div className="column-count">{tasks.length}</div>
        <button className="add-btn" onClick={() => onCreate?.(col.key)}>+</button>
      </div>

      <div className={`cards ${empty ? 'empty' : ''}`}>
        {tasks.map((t) => (
          <Card
            key={t.id}
            t={t}
            draggingId={draggingId}
            onDragStart={onDragStart}
            onDragEnd={() => {}}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}
