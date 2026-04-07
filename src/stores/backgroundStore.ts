import { defineStore } from 'pinia'
import { BG_PATH_SET } from '../constants/constants.ts'
const w = window as Window & typeof globalThis

export const useBackgroundStore = defineStore('BackgroundStore', {
  state: () => ({
    images: BG_PATH_SET,
    bgReady: false,
  }),
  actions: {
    waitContent() {
      // when browser finish main tasks bgReady will be changed and user can see images on background
      const idle = (cb: () => void) =>
        'requestIdleCallback' in window ? w.requestIdleCallback(cb) : setTimeout(cb, 300)

      idle(() => {
        this.bgReady = true
      })
    },
  },
})
