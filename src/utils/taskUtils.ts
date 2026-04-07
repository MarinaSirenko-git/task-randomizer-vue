import type { TaskData } from '@/types/task'

export function getRandomTaskNumber(tasks?: TaskData[]): number | undefined {
  if (!tasks?.length) return

  const undoneTasks = tasks.filter((task) => !task.done)
  if (!undoneTasks.length) return

  const randomIndex = Math.floor(Math.random() * undoneTasks.length)
  const task = undoneTasks[randomIndex]

  if (!task) return

  return task.num
}

export function reorderUndoneTasks(tasks: TaskData[]): TaskData[] | undefined {
  const done = tasks.filter((t) => t.done)
  const undone = tasks.filter((t) => !t.done)

  for (let i = undone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = undone[i]
    const random = undone[j]

    if (!current || !random) continue

    undone[i] = random
    undone[j] = current
  }

  const result = [...undone, ...done]

  return result.map((task, index) => ({
    ...task,
    num: index + 1,
  }))
}
