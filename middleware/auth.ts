export default defineNuxtRouteMiddleware(async () => {
    const { data: accessToken } = await useFetch('/api/user/access-token', {
        method: 'POST'
    })
    if (accessToken.value) {
        const token = useToken()
        token.accessToken = accessToken.value as string
    } else {
        return await navigateTo('/')
    }
})
