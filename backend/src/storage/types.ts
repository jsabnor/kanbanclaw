export type Task = {
  id: number
  title: string
  agent: string
  status: string
}

export interface Storage {
  getAllTasks(): Promise<Task[]>
}
