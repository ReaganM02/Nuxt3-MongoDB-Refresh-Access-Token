export default defineEventHandler((event) => {
    try {
        deleteCookie(event, 'authorization')
        return 200
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
