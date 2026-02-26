import React from 'react'
import Column from './Column'
import { Status, Task } from '../types'
import { HiSparkles, HiOutlineClock, HiOutlineCheck } from 'react-icons/hi'

const columns: { key: Status; title: string; icon: React.ReactNode }[] = [
  { key: 'todo', title: 'To Do', icon: <HiSparkles /> },
  { key: 'inprogress', title: 'In Progress', icon: <HiOutlineClock /> },
  { key: 'done', title: 'Done', icon: <HiOutlineCheck /> }
]

type Props = {
  tasks: Task[]
  draggingId: number | null
  onDragOver: (e: React.DragEvent, col: Status) => void
  onDrop: (e: React.DragEvent, destStatus: Status, destIndex?: number) => void
  onDragStart: (e: React.DragEvent, t: Task) => void
}

export default function Board({ tasks, draggingId, onDragOver, onDrop, onDragStart }: Props) {
  return (
    <div className="board">
      {columns.map((col) => (
        <Column
          key={col.key}
          col={col}
          tasks={tasks.filter((t) => t.status === col.key)}
          draggingId={draggingId}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  )
}
