<script lang="ts" setup>

</script>
<template>
    <main class="h-screen">
        <div class="h-screen grid grid-cols-2">
            <div class="bg-gradient-to-br from-sky-700 via-violet-500 to-red-700">
                <!-- -->
            </div>
            <div class="grid place-items-center">
                <div class="max-w-lg w-full">
                    <slot />
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped lang="css"></style>
