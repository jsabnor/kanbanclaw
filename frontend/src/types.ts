export type Status = 'todo' | 'inprogress' | 'done'

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
  if (s === 'todo') return 'var(--todo)'
  if (s === 'inprogress') return 'var(--inprogress)'
  return 'var(--done)'
}
