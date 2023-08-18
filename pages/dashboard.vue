<script lang="ts" setup>
import { UserData } from '~/types/user'

definePageMeta({
    middleware: ['auth']
})
const { data: userData } = await useFetch<UserData>('/api/dashboard', {
    method: 'GET',
    headers: {
        authorization: `Bearer ${useToken().accessToken}`
    }
})

async function onLogout() {
    await $fetch('/api/user/logout', {
        method: 'POST'
    }).then(async () => {
        await navigateTo('/')
    }).catch((error) => {
        console.log(error)
    })
}

</script>
<template>
    <div class="h-screen w-full grid place-items-center bg-zinc-100">
        <div class="max-w-xl w-full bg-white rounded overflow-hidden shadow-md shadow-zinc-300">
            <div class="bg-gradient-to-br from-sky-700 via-violet-500 to-red-700 grid place-items-center p-2">
                <!--  -->
            </div>
            <div class="p-4">
                <h1 class="text-zinc-600 text-center text-xl">
                    You are Authenticated!
                </h1>
                <div
                    v-if="userData"
                    class="mt-6"
                >
                    <div class="text-zinc-600">
                        Name: {{ userData.firstName }} {{ userData.lastName }}
                    </div>
                    <div class="text-zinc-600 mt-4">
                        Email: {{ userData.email }}
                    </div>
                    <div class="text-zinc-600 mt-4">
                        Verified: {{ userData.verified }}
                    </div>
                    <div class="text-zinc-600 mt-4">
                        Account Created: {{ new Date(userData.createdAt) }}
                    </div>
                    <div class="text-sm mt-5">
                        <div class="text-zinc-500">
                            Refresh Token:
                        </div>
                        <div class="whitespace-pre-wrap break-all">
                            {{ useToken().accessToken }}
                        </div>
                        <div class="mt-4">
                            Refresh access token will automatically refresh every time you refresh the page, and the
                            previous
                            refresh token will become invalid.
                        </div>
                        <div class="bg-orange-100 p-4 rounded mt-4 text-orange-400">
                            Note: Do not expose your access token, this is just for demo purposes.
                        </div>
                    </div>
                    <div class="mt-10">
                        <button @click.prevent="onLogout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css"></style>
