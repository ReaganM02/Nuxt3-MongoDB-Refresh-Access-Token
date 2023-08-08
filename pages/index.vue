<script lang="ts" setup>
import { FormKitNode } from '@formkit/core'
import { NuxtError } from 'nuxt/app'
import { SignInRequestBody } from 'types/user'

definePageMeta({
    layout: 'user',
    middleware: 'unauth'
})

const loading = ref(false)
const showPassword = ref(false)

async function onSignIn(formData: SignInRequestBody, node: FormKitNode | undefined) {
    loading.value = true
    node?.clearErrors()
    await $fetch('/api/user/sign-in', {
        method: 'POST',
        body: formData
    }).then(async () => {
        node?.reset()
        await navigateTo('/dashboard')
    }).catch((err: { data: NuxtError }) => {
        node?.setErrors('Sign in failed', {
            email: err.data.statusMessage!,
            password: err.data.statusMessage!
        })
    }).finally(() => {
        loading.value = false
    })
}

</script>
<template>
    <div>
        <AccountTitle label="Welcome Back!" />
        <p class="mt-2 text-zinc-500 text-center">
            Sign in now to unlock exclusive content and stay connected with ease.
        </p>
        <div class="mt-6">
            <FormKit
                type="form"
                :actions="false"
                @submit="onSignIn"
            >
                <div>
                    <FormKit
                        type="text"
                        label="Email"
                        placeholder="johnwick@gmail.com"
                        name="email"
                        validation="required:trim|email"
                    />
                </div>
                <div class="mt-6">
                    <FormKit
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        :placeholder="showPassword ? 'Password12345' : '***********'"
                        name="password"
                        help="Min of 10 characters"
                        validation="required:trim|length:10,30"
                    />
                    <AccountPasswordToggle
                        :is-visible="showPassword"
                        @click.prevent="showPassword = !showPassword"
                    />
                </div>
                <div class="mt-8">
                    <NuxtLink
                        to="/forgot-password"
                        class="text-zinc-600 cursor-pointer text-sm hover:text-blue-700 hover:underline"
                    >
                        I forgot my password
                    </NuxtLink>
                </div>
                <div class="mt-8">
                    <AccountFormSubmit
                        label="Sign in"
                        :loading="loading"
                    />
                </div>
            </FormKit>
        </div>
        <div class="mt-6">
            <p class="text-center">
                Don't have an account?
                <NuxtLink
                    class="text-blue-600 hover:underline"
                    to="/sign-up"
                >
                    Create one for free.
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
<style scoped lang="css"></style>
