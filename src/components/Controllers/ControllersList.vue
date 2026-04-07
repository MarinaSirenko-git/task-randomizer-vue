<script lang="ts" setup>
import Button from './Button.vue'
import { useToDoStore } from '@/stores/toDoStore'
const toDoStore = useToDoStore()
</script>

<template>
  <section class="content-header">
    <Button class="btn--primary" @click="toDoStore.setRandomTaskNumber" >
      <span class="desktop">Higlite random task!</span>
      <span class="mobile">Random!</span>
    </Button>
    <Button class="btn--primary" @click="toDoStore.setRandomTaskOrder" >
      <span class="desktop">Set random task order!</span>
      <span class="mobile">Random order!</span>
    </Button>
    <Button text="Clear all tasks!" class="btn--primary" @click="toDoStore.clearTasks()" >
      <span class="desktop">Clear all tasks!</span>
      <span class="mobile">Clear!</span>
    </Button>
  </section>
</template>

<style scoped>
.content-header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 30px 0;
}

@media (max-width: 767px) {
  .content-header {
    padding: 10px 0px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .content-header {
    padding: 15px 15px;
    gap: 10px;
  }
}
</style>
