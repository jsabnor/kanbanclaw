export type Status = 'backlog' | 'todo' | 'inprogress' | 'done'

export type Column = {
  key: Status | string
  title: string
}

export type Task = {
  id: number
  title: string
  agent: string
  status: Status
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((s) => s[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
}

export function statusColor(s: Status) {
  if (s === 'backlog') return 'var(--muted)'
  if (s === 'todo') return 'var(--todo)'
  if (s === 'inprogress') return 'var(--inprogress)'
  return 'var(--done)'
}
