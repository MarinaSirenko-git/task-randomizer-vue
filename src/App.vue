<script lang="ts" setup>
  import { onMounted, reactive, watch, computed } from 'vue'
  import {ref} from 'vue'
  // constants
  const STORAGE_KEY = 'ranomizer-tasks';
  const w = window as Window & typeof globalThis

  // types
  interface TaskData {
    id: string;
    num: number;
    text: string;
    done: boolean;
  }

  // state
  const inputValue = ref('')
  const bgReady = ref(false);
  const tasks = reactive<TaskData[]>([])

  const doneTasks = computed(() => {
      return tasks.filter((t) => t.done);
  })

  const undoneTasks = computed(() => {
      return tasks.filter((t) => !t.done);
  })

  // logic
  function addTask(){
    tasks.push({
      id: crypto.randomUUID(),
      num: tasks.length + 1,
      text: inputValue.value,
      done: false,
    } satisfies TaskData)

    inputValue.value = '';
  }

  function deleteTask(id:string) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    tasks.splice(0, tasks.length, ...updatedTasks ?? []);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
  }


  onMounted(()=>{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const stored = JSON.parse(raw)
    if (!Array.isArray(stored)) return

    if(stored) tasks.splice(0, tasks.length, ...stored);

    // when browser finish main tasks bgReady will be changed and user can see images on background
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? w.requestIdleCallback(cb)
        : setTimeout(cb, 300);

      idle(() => {
        bgReady.value = true;
      });
  })

  watch(tasks, () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, {deep: true})

</script>

<template>
  <main class="main">
    <div class="bg">
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/nik-9SU2o4qwlmI-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-2zvzlI95Svs-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-P2sNmlTo9Z8-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-pqLONJknUcM-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/nik-9SU2o4qwlmI-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-UIftHKAl6nE-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-2zvzlI95Svs-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-UIftHKAl6nE-unsplash.webp"/>
      <img class="bg__item" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" fetchpriority="low" src="./assets/public-domain-vectors-pqLONJknUcM-unsplash.webp"/>
    </div>
    <section class="content">
      <header class="content__header">
        <button class="content__btn btn--primary">
          Higlite random task!
        </button>
        <button class="content__btn btn--primary">
          Set random task order!
        </button>
      </header>
      <form class="content__form form" @submit.prevent="addTask">
        <label class="form__label sr-only" for="task-input">Add a task</label>
        <input type="text" v-model="inputValue" placeholder="Add a task" class="form__input form__input--text"/>
        <button type="submit" class="content__btn btn--secondary">Add</button>
      </form>
      <footer class="content__footer">
        <ul class="task-list" aria-label="To do tasks">
          <li class="task-list__item" v-for="task in undoneTasks" :key="task.id">
            <span class="task-list__item-num">{{ task.num }}</span>
            <label class="task-list__label">
              <input class="task-list__checkbox" type="checkbox" v-model="task.done" />
              <span class="task-list__item-text" :class="{ 'task-list__text--done': task.done }">
                {{ task.text }}
              </span>
            </label>
            <button class="task-list__item-btn icon-btn" @click="deleteTask(task.id)" :aria-label="`Delete task: ${task.text}`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#123048" width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </li>
        </ul>
        <h3 v-if="doneTasks.length > 0" class="task-list__title">Done</h3>
        <ul class="task-list task-list--muted" aria-label="Completed tasks">
          <li class="task-list__item" v-for="task in doneTasks" :key="task.id">
            <label class="task-list__label">
              <input class="task-list__checkbox" type="checkbox" v-model="task.done" />
              <span class="task-list__item-text" :class="{ 'task-list__text--done': task.done }">
                {{ task.text }}
              </span>
            </label>
            <button class="task-list__item-btn icon-btn" @click="deleteTask(task.id)" :aria-label="`Delete task: ${task.text}`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#123048" width="20px" height="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </li>
        </ul>
      </footer>
    </section>
  </main>
</template>

<style scoped>

  :global(html, body, main) {
    margin: 0;
    height: 100%;
  }

  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }

  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    overflow: hidden;
    font-family: "Caveat", cursive;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 33%);
    width: 100%;
    height: 100%;
    background: #f3f3f3;
  }

  .bg {
    background: #f3f3f3;
  }

  .bg--ready {
    background: transparent;
  }

  .bg__item {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  .content__header {
    box-sizing: border-box;
    width: 100%;
    padding: 40px 40px;
    display: flex;
    gap: 50px;
    justify-content: center;
  }

  .content__form {
    padding: 0px 40px;
    margin: 0;
    width: 100%;
    display: flex;
    gap: 15px;
    align-items: center;
    box-sizing: border-box;
  }

  .form__input {
    margin: 0;
    width: 100%;
    height: 30px;
    padding: 4px 4px 4px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: "Caveat", cursive;
  }

  .form__input:focus {
    outline: 1px solid #f2652f;
    border: 1px solid #f2652f;
  }

  .content__btn {
    margin: 0;
    border: none;
    padding: 10px 8px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    font-family: "Caveat", cursive;
  }

  .btn--primary {
    background-color: #9a69ba;
    border: 1px solid #9a69ba;
    color: white;
  }

  .btn--primary:hover,
  .btn--primary:focus-visible {
    background-color: #69369b;
  }

  .btn--secondary {
    border: 1px solid #9a69ba;
    background-color: white;
    color:#9a69ba;
    max-height: 40px;
    font-size: 16px;
  }

  .btn--secondary:hover,
  .btn--secondary:focus-visible {
    border: 1px solid #69369b;
    color:#69369b;
  }

  /* task list */

  .content__footer {
    box-sizing: border-box;
    width: 100%;
    padding: 0 40px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .task-list {
    padding: 30px 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    list-style: none;
    padding-left: 0;
  }

  .task-list__title {
    color: #ccc;
    margin: 0;
    padding: 0;
  }

  .task-list__item {
    display: flex;
    align-items: center;
    justify-items: start;
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin: 0 0 10px 0;
    padding: 0 0 5px 0;
  }

  .task-list__label {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 90%;
    box-sizing: border-box;
  }

  .task-list__item-num {
    background-color: #9a69ba;
    color: white;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 15px;
  }

  .task-list__item-text {
    padding: 0;
    margin: 0;
    font-size: 18px;
    color: #123048;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .task-list__item-btn {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    margin-left: auto;
  }

  .task-list__item-checkbox {
    padding: 0 5px 0 0;
    margin: 0 15px 0 0;
  }

  .task-list__text--done {
    text-decoration-line: line-through;
  }

  .task-list--muted {
    opacity: 0.8;
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

  .content__form {
    padding: 10px 10px;
    gap: 10px;
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
