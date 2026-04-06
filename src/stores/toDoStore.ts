import { defineStore } from 'pinia'

export const useToDoStore = defineStore('toDo', {
  state: () => ({
    tasks: [],
  }),
})