<script lang="ts" setup>
import { FormKitNode } from '@formkit/core'
import { NuxtError } from 'nuxt/app'
definePageMeta({
    layout: 'user'
})

const loading = ref(false)
const message = ref<string | null>(null)
async function onRequestResetPassword(formData: { email: string }, node: FormKitNode | undefined) {
    loading.value = true
    message.value = null
    await $fetch('/api/user/forgot-password', {
        method: 'POST',
        body: formData
    }).catch((err: { data: NuxtError }) => {
        if (err.data.statusMessage) {
            node?.setErrors(err.data.statusMessage)
        }
    }).then(() => {
        message.value = 'A reset password link has been sent to your email'
    }).finally(() => {
        loading.value = false
    })
}
</script>
<template>
    <div>
        <AccountTitle label="Forgot Password" />
        <p class="mt-2 text-zinc-500 text-center">
            Locked out? No worries. If you've forgotten your password, resetting it is a breeze.
        </p>
        <div class="mt-6">
            <FormKit
                type="form"
                :actions="false"
                @submit="onRequestResetPassword"
            >
                <FormKit
                    type="email"
                    label="Registered email address"
                    validation="required:trim|email"
                    name="email"
                />
                <p
                    v-if="message"
                    class="text-sm text-center text-green-700 mt-8"
                >
                    {{ message }}
                </p>
                <div class="mt-4">
                    <AccountFormSubmit
                        label="Reset my password"
                        :loading="loading"
                    />
                </div>
            </FormKit>
        </div>
    </div>
</template>
<style scoped lang="css"></style>
