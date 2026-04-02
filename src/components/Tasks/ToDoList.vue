<script lang="ts" setup>
  import { computed } from 'vue'
  import ToDoItem from './ToDoItem.vue'

    // types
    interface TaskData {
        id: string;
        num: number;
        text: string;
        done: boolean;
    }

    const props = defineProps<{
        tasks: TaskData[]
    }>()

    const doneTasks = computed(() => {
        return props.tasks.filter((t) => t.done);
    })

    const undoneTasks = computed(() => {
        return props.tasks.filter((t) => !t.done);
    })

    // logic
    function deleteTask(id:string) {
        const updatedTasks = props.tasks.filter((t) => t.id !== id);
        props.tasks.splice(0, props.tasks.length, ...updatedTasks ?? []);
    }

</script>

<template>
    <footer class="content__footer">
        <ul class="task-list" aria-label="To do tasks">
            <ToDoItem v-for="task in undoneTasks" :task="task" :key="task.id"  @delete="deleteTask" />
        </ul>
        <h3 v-if="doneTasks.length > 0" class="task-list__title">Done</h3>
        <ul class="task-list task-list--muted" aria-label="Completed tasks">
            <ToDoItem v-for="task in doneTasks" :task="task" :key="task.id" @delete="deleteTask" />
        </ul>
    </footer>
</template>

<style scoped>
  .content__footer {
    box-sizing: border-box;
    width: 100%;
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

  .task-list__title {
    color: #ccc;
    margin: 0;
    padding: 0;
    font-size: 24px;
  }
</style>