<script lang="ts" setup>
  import { useBackgroundStore } from '@/stores/backgroundStore';
  const backgroundStore = useBackgroundStore();
</script>

<template>
  <div class="bg">
    <img
      v-for="item in backgroundStore.images" 
      :key="item.id"
      class="bg__item"
      alt=""
      aria-hidden="true"
      role="presentation"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      :src="item.path"
    />
  </div>
</template>

<style scoped>
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
</style>
