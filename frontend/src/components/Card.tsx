import React from 'react'
import { Task } from '../types'
import Avatar from './Avatar'

type Props = {
  t: Task
  draggingId: number | null
  onDragStart: (e: React.DragEvent, t: Task) => void
  onDragEnd: () => void
  onEdit?: (t: Task) => void
  onDelete?: (id: number) => void
}

export default function Card({ t, draggingId, onDragStart, onDragEnd, onEdit, onDelete }: Props) {

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
            <span className="status">{t.status}</span>
          </div>
        </div>
      </div>
      <div className="card-actions">
        {onEdit && (
          <button className="card-edit" onClick={() => onEdit(t)} aria-label={`edit-${t.id}`}>
            Edit
          </button>
        )}
        {onDelete && (
          <button className="card-delete" onClick={() => onDelete(t.id)} aria-label={`delete-${t.id}`}>
            Delete
          </button>
        )}
      </div>
    </article>
  )
}
