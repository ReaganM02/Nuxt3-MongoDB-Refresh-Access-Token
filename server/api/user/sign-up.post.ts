export default defineEventHandler(async (event) => {
    try {
        const test = await useUserModel.findOne()
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong' })
    }
})
