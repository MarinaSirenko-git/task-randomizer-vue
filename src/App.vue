<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { ref } from 'vue'

// components
import AddForm from './components/Forms/AddForm.vue'
import CounterList from './components/Trakers/CounterList.vue'
import ToDoList from './components/Tasks/ToDoList.vue'
import ControllersList from './components/Controllers/ControllersList.vue'
import MainBg from './components/Bg/MainBg.vue'

// constants
import { STORAGE_KEY } from './constants'
const w = window as Window & typeof globalThis

// types
import type { TaskData } from './types/task'

// state
const bgReady = ref(false)
const tasks = reactive<TaskData[]>([])

// logic
function addTask(value: string) {
  tasks.push({
    id: crypto.randomUUID(),
    num: tasks.length + 1,
    text: value,
    done: false,
  } satisfies TaskData)
}

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  const stored = JSON.parse(raw)
  if (!Array.isArray(stored)) return

  if (stored) tasks.splice(0, tasks.length, ...stored)

  // when browser finish main tasks bgReady will be changed and user can see images on background
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? w.requestIdleCallback(cb) : setTimeout(cb, 300)

  idle(() => {
    bgReady.value = true
  })
})

watch(
  tasks,
  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },
  { deep: true },
)
</script>

<template>
  <main class="main">
    <MainBg />
    <CounterList />
    <section class="content">
      <ControllersList />
      <AddForm @submit="addTask" />
      <ToDoList :tasks="tasks" />
    </section>
  </main>
</template>

<style>
:global(html, body, main) {
  margin: 0;
  height: 100%;
}

.main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  overflow: hidden;
  font-family: 'Caveat', cursive;
}

.content {
  position: absolute;
  background-color: white;
  width: 70%;
  height: 70%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

@media (max-width: 767px) {
  .content {
    width: 90%;
    height: 90%;
  }

  .content__header {
    padding: 10px 10px;
    gap: 10px;
  }

  .content__footer {
    padding: 0 10px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .content {
    width: 80%;
    height: 80%;
  }

  .content__header {
    padding: 15px 15px;
    gap: 10px;
  }

  .content__footer {
    padding: 0 15px;
  }
}
</style>
