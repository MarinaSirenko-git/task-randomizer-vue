<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ToDoItem from './ToDoItem.vue'
import { useToDoStore } from '@/stores/toDoStore'
const toDoStore = useToDoStore()
const { tasks, doneTasks, undoneTasks, randomTaskNum } = storeToRefs(toDoStore)
const { deleteTask, toggleTask } = toDoStore
</script>

<template>
  <footer class="content__footer">
    <div v-if="tasks.length > 0">
      <ul class="task-list" aria-label="To do tasks">
        <ToDoItem
          v-for="task in undoneTasks"
          :task="task"
          :key="task.id"
          :isHighlite="task.num === randomTaskNum"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </ul>
      <h3 v-if="doneTasks.length > 0" class="task-list__title">Done</h3>
      <ul class="task-list task-list--muted" aria-label="Completed tasks">
        <ToDoItem
          v-for="task in doneTasks"
          :task="task"
          :key="task.id"
          @toggle="toggleTask"
          @delete="deleteTask"
        />
      </ul>
    </div>
    <div v-else class="content-wrapper">
      <p class="task-list__title">Add your fist task!</p>
    </div>
  </footer>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.content__footer {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 767px) {
  .content__footer {
    padding: 0 10px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .content__footer {
    padding: 0 15px;
  }
}

.task-list {
  padding: 0;
}

.task-list__title {
  color: #ccc;
  margin: 0;
  padding: 0;
  font-size: 24px;
}
</style>
