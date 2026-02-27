import React, { useEffect, useState } from 'react'
import Column from './Column'
import { Column as ColumnType, Status, Task } from '../types'
import { HiSparkles, HiOutlineClock, HiOutlineCheck } from 'react-icons/hi'

const iconMap: Record<string, React.ReactNode> = {
  backlog: <HiSparkles />,
  todo: <HiSparkles />,
  inprogress: <HiOutlineClock />,
  done: <HiOutlineCheck />
}

type Props = {
  tasks: Task[]
  draggingId: number | null
  onDragOver: (e: React.DragEvent, col: Status) => void
  onDrop: (e: React.DragEvent, destStatus: Status, destIndex?: number) => void
  onDragStart: (e: React.DragEvent, t: Task) => void
  onCreate?: (status: string) => void
  onEdit?: (t: Task) => void
  onDelete?: (id: number) => void
}

export default function Board({ tasks, draggingId, onDragOver, onDrop, onDragStart, onCreate, onEdit, onDelete }: Props) {
  const [cols, setCols] = useState<ColumnType[] | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/columns')
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setCols(data)
      })
      .catch(() => {
        if (mounted)
          setCols([
            { key: 'todo', title: 'To Do' },
            { key: 'inprogress', title: 'In Progress' },
            { key: 'done', title: 'Done' }
          ])
      })
    return () => {
      mounted = false
    }
  }, [])

  const renderCols = cols || []

  return (
    <div className="board">
      {renderCols.map((col) => (
        <Column
          key={col.key}
          col={{ key: col.key as any, title: col.title, icon: iconMap[col.key] }}
          tasks={tasks.filter((t) => t.status === col.key)}
          draggingId={draggingId}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onCreate={onCreate}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
