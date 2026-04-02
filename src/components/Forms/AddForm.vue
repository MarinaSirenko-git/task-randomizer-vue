<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../Controllers/Button.vue'

const emit = defineEmits<{
  submit: [value: string]
}>()

const inputValue = ref('')

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault()
  const value = inputValue.value.trim()
  if (!value) return
  emit('submit', value)
  inputValue.value = ''
}
</script>

<template>
  <form class="content__form form" @submit.prevent="handleSubmit">
    <label class="form__label sr-only" for="task-input">Add a task</label>
    <input
      type="text"
      v-model="inputValue"
      placeholder="Add a task"
      class="form__input form__input--text"
    />
    <Button text="Add" class="btn--secondary" />
  </form>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
  font-family: 'Caveat', cursive;
  font-size: 24px;
}

.form__input:focus {
  outline: 1px solid #f2652f;
  border: 1px solid #f2652f;
}
</style>
