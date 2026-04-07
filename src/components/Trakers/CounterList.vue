<script lang="ts" setup>
import Counter from './Counter.vue'
import { storeToRefs } from 'pinia'
import { useToDoStore } from '@/stores/toDoStore'
const { tasksCount, undoneTasksCount, doneTasksCount } = storeToRefs(useToDoStore())
</script>

<template>
  <section class="state">
    <ul class="state-list">
      <Counter name="Total:" :count="tasksCount" />
      <Counter name="Active:" :count="undoneTasksCount" />
      <Counter name="Completed:" :count="doneTasksCount" />
    </ul>
  </section>
</template>

<style scoped>
.state {
  position: absolute;
  top: 0;
  background: white;
  width: 100%;
  font-size: 24px;
}

.state-list {
  display: flex;
  justify-content: space-between;
}

@media (min-width: 300px) and (max-width: 1023px) {
  .state-list {
    display: none;
  }
}
</style>
