<script lang="ts" setup>
  import Button from './Button.vue'
</script>

<template>
  <section class="content-header">
    <Button text="Higlite random task!" class="btn--primary" />
    <Button text="Set random task order!" class="btn--primary" />
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
  .content__header {
    padding: 10px 10px;
    gap: 10px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .content__header {
    padding: 15px 15px;
    gap: 10px;
  }
}
</style>
