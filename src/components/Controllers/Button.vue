<script lang="ts" setup>
const props = defineProps({
  text: String,
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button class="content__btn" @click="handleClick">
    <slot>{{ text }}</slot>
  </button>
</template>

<style scoped>
.content__btn {
  margin: 0;
  border: none;
  padding: 10px 8px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Caveat', cursive;
}

.btn--primary {
  background-color: #9a69ba;
  border: 1px solid #9a69ba;
  color: white;
  font-size: 24px;
}

.btn--primary:hover,
.btn--primary:focus-visible {
  background-color: #69369b;
}

.btn--secondary {
  border: 1px solid #9a69ba;
  background-color: white;
  color: #9a69ba;
  font-size: 22px;
}

.btn--secondary:hover,
.btn--secondary:focus-visible {
  border: 1px solid #69369b;
  color: #69369b;
}
</style>
