<script lang="ts" setup>

withDefaults(defineProps<{
    size?: string
    label: string
}>(), {
    size: 'text-2xl'
})
</script>
<template>
    <h1
        class="text-center font-bold text-zinc-900"
        :class="size"
    >
        {{ label }}
    </h1>
</template>
<style scoped lang="css"></style>
