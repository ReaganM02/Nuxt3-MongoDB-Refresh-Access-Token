<script lang="ts" setup>
defineProps<{
    isVisible: boolean
}>()
</script>
<template>
    <div class="text-sm text-zinc-400 cursor-pointer float-right hover:underline hover:text-blue-600">
        {{ isVisible ? 'Hide password' : 'Show password' }}
    </div>
</template>
<style scoped lang="css"></style>
