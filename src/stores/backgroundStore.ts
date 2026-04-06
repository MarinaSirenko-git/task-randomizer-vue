import { defineStore } from 'pinia'
import { BG_PATH_SET } from '../constants/constants.ts'

export const useBackgroundStore = defineStore('BackgroundStore', {
  state: () => ({
    images: BG_PATH_SET,
  }),
})
