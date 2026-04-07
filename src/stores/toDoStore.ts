import { defineStore } from 'pinia'
import { STORAGE_KEY } from '@/constants/constants'
import type { TaskData } from '@/types/task'
import { getRandomTaskNumber, reorderUndoneTasks } from '@/utils/taskUtils'

export const useToDoStore = defineStore('toDo', {
  state: () => ({
    tasks: [] as TaskData[],
    randomTaskNum: null as number | null,
  }),
  getters:{
    doneTasks: (state) => state.tasks.filter((t) => t.done),
    undoneTasks: (state) => state.tasks.filter((t) => !t.done),
    tasksCount: (state) => state.tasks.length,
    undoneTasksCount() { return this.undoneTasks.length},
    doneTasksCount() {return this.doneTasks.length}
  },
  actions: {
    getTasks() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const stored: unknown = JSON.parse(raw)
      if (!Array.isArray(stored)) return
      // if (stored) this.tasks.splice(0, this.tasks.length, ...(stored as TaskData[]))
      this.$patch({
        tasks: stored as TaskData[],
      })
    },
    saveTasks() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
    },
    addTask(value: string) {
      this.tasks.push({
        id: crypto.randomUUID(),
        num: this.tasks.length + 1,
        text: value,
        done: false,
      } satisfies TaskData)
      this.saveTasks()
    },
    deleteTask(id: string) {
      const updatedTasks = this.tasks.filter((t) => t.id !== id)
      this.tasks.splice(0, this.tasks.length, ...(updatedTasks ?? []))
      this.saveTasks()
    },
    toggleTask(id: string){
      const task = this.tasks.find((t) => t.id === id)
      if(!task) return;
      task.done = !task.done
      this.saveTasks()
    },
    clearTasks(){
      this.$reset()
      localStorage.removeItem(STORAGE_KEY)
    },
    setRandomTaskNumber(){
      const num = getRandomTaskNumber(this.tasks)
      if (num === undefined) return
      this.randomTaskNum = num
    },
    setRandomTaskOrder(){
      const newOrder = reorderUndoneTasks(this.tasks);
      if(newOrder && newOrder.length > 0) {
        this.tasks = newOrder;
      }
      this.saveTasks()
    }
  },
})
