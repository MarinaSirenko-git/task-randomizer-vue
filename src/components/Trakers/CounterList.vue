<script lang="ts" setup>
import Counter from './Counter.vue'
</script>

<template>
  <section class="state">
    <ul class="state-list">
      <Counter name="Total:" count="5" />
      <Counter name="Active:" count="5" />
      <Counter name="Completed:" count="5" />
      <Counter name="Progress:" count="5" />
      <Counter name="Random:" count="5" />
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
</style>
