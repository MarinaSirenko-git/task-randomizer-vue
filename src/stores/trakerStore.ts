import { defineStore } from 'pinia'

export const useTrakerStore = defineStore('TrakerStore', {
  state: () => ({
    total: 0,
    active: 0,
    completed: 0,
    progress: 0,
    random: 0,
  }),
})