export type Task = {
  id: number
  title: string
  agent: string
  status: string
}

export interface Storage {
  getAllTasks(): Promise<Task[]>
  createTask(input: Omit<Partial<Task>, 'id'> & { title: string }): Promise<Task>
  updateTask(id: number, patch: Partial<Task>): Promise<Task | null>
  deleteTask(id: number): Promise<boolean>
  getAgents(): Promise<string[]>
}
