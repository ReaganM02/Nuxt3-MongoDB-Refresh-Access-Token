<script lang="ts" setup>

</script>
<template>
    <div class="mt-10 text-sm text-zinc-400 flex justify-between">
        <div>
            <NuxtLink
                to="/"
                class="flex gap-2 items-center cursor-pointer hover:text-blue-700 hover:underline"
            >
                <span>
                    <IconLongArrowLeft class="w-4 h-4" />
                </span>
                <span>Sign in</span>
            </NuxtLink>
        </div>
        <div>
            <NuxtLink
                to="/sign-up"
                class="flex gap-2 items-center cursor-pointer hover:text-blue-700 hover:underline"
            >
                <span>Sign Up</span>
                <span>
                    <IconLongArrowLeft class="w-4 h-4 rotate-180" />
                </span>
            </NuxtLink>
        </div>
    </div>
</template>
<style scoped lang="css"></style>
