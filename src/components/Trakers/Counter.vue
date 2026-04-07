<script lang="ts" setup>
const props = defineProps({
    name: String,
    count: Number
})
</script>

<template>
    <li class="state-item"><span>{{ props.name }}</span><span>{{ props.count }}</span></li>  
</template>

<style scoped>
    .state-item {
        display: flex;
        gap: 10px;
    }
</style>