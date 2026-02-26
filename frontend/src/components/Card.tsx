import React from 'react'
import { Task, statusColor } from '../types'
import Avatar from './Avatar'

type Props = {
  t: Task
  draggingId: number | null
  onDragStart: (e: React.DragEvent, t: Task) => void
  onDragEnd: () => void
}

export default function Card({ t, draggingId, onDragStart, onDragEnd }: Props) {
  return (
    <article
      key={t.id}
      className={`card ${draggingId === t.id ? 'dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, t)}
      onDragEnd={onDragEnd}
    >
      <div className="card-main">
        <Avatar agent={t.agent} />
        <div className="card-body">
          <div className="card-title">{t.title}</div>
          <div className="card-meta">
            <span className="agent">{t.agent}</span>
            <span className="status" style={{ background: statusColor(t.status) }}>{t.status}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
