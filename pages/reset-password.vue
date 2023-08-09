<script lang="ts" setup>
import { NuxtError } from 'nuxt/app'
import { FormKitNode } from '@formkit/core'
definePageMeta({
    layout: 'user',
    middleware: ['unauth']
})
const { id, uuid } = useRoute().query
const loading = ref(false)

async function onResetPassword(formData: { password: string }, node: FormKitNode | undefined) {
    loading.value = true
    node?.clearErrors()
    await $fetch('/api/user/reset-password', {
        method: 'POST',
        body: formData,
        query: { id, uuid }
    }).then(async () => {
        node?.reset()
        await navigateTo('/')
    }).catch((err: { data: NuxtError }) => {
        if (err.data.statusMessage) {
            node?.setErrors(err.data.statusMessage)
        }
    }).finally(() => {
        loading.value = false
    })
}

</script>
<template>
    <div>
        <AccountTitle label="Set a new Password" />
        <p class="mt-2 text-zinc-500 text-center">
            Don't let a forgotten password hold you back. Reset now and resume your online journey seamlessly.
        </p>
        <div class="mt-6">
            <FormKit
                type="form"
                :actions="false"
                @submit="onResetPassword"
            >
                <FormKit
                    type="password"
                    label="New Password"
                    validation="required:trim|length:10"
                    name="password"
                />
                <div class="mt-4">
                    <AccountFormSubmit
                        label="Set new Password"
                        :loading="loading"
                    />
                </div>
            </FormKit>
        </div>
        <AccountNavigate />
    </div>
</template>
<style scoped lang="css"></style>
