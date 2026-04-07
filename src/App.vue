<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

// components
import AddForm from './components/Forms/AddForm.vue'
import CounterList from './components/Trakers/CounterList.vue'
import ToDoList from './components/Tasks/ToDoList.vue'
import ControllersList from './components/Controllers/ControllersList.vue'
import MainBg from './components/Bg/MainBg.vue'

// store
import { useToDoStore } from './stores/toDoStore'
const toDoStore = useToDoStore()
const { tasks } = storeToRefs(toDoStore)
const { addTask, getTasks } = toDoStore

import { useBackgroundStore } from './stores/backgroundStore'
const { waitContent } = useBackgroundStore()

onMounted(() => {
  getTasks()
  waitContent()
})
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
html,
body,
main {
  margin: 0;
  height: 100%;
}

.desktop {
  display: inline;
}

.mobile {
  display: none;
}

@media (max-width: 767px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: inline;
  }
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
    width: 96%;
    height: 98%;
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
