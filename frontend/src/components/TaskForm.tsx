import React, { useEffect, useState } from 'react'
import { Status, Task } from '../types'

type Props = {
  initial?: Partial<Task>
  defaultStatus?: Status | string
  onCancel: () => void
  onSubmit: (payload: { title: string; agent?: string; status?: string }) => void
}

export default function TaskForm({ initial = {}, defaultStatus, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial.title || '')
  const [agent, setAgent] = useState(initial.agent || '')
  const [status, setStatus] = useState<string>(initial.status || (defaultStatus as string) || 'backlog')
  const [agents, setAgents] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/tasks/agents')
      .then((r) => r.json())
      .then((data) => mounted && setAgents(data))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), agent: agent || undefined, status })
  }

  return (
    <div className="modal-overlay">
      <form className="task-form" onSubmit={submit}>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        </label>

        <label>
          Agent
          <select value={agent} onChange={(e) => setAgent(e.target.value)}>
            <option value="">— unassigned —</option>
            {agents.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>

        <label>
          Status
          <input value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}
