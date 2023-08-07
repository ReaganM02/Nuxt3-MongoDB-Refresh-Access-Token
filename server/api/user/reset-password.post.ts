import userModel from '../../models/user.model'

interface Query {
    uuid: string
    id: string
}
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) as unknown as Query | null
        const body = await readBody<{ password: string } | null>(event)
        if (!query || !query.id || !query.uuid || !body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await userModel.findOne({ uuid: query.uuid, resetPasswordExpAt: { $gt: new Date(Date.now()) } }).select('+resetPassword +resetPasswordExpAt')
        if (!user) {
            return createError({ statusCode: 404, statusMessage: 'User not found or verification code has expired.' })
        }
        const isResetPasswordIDCorrect = await compareStrings(query.id, user.resetPassword!)
        if (!isResetPasswordIDCorrect) {
            return createError({ statusCode: 400, statusMessage: 'Invalid link ID' })
        }
        user.password = await hashStrings(body.password)
        user.resetPassword = undefined
        user.resetPasswordExpAt = undefined
        user.save()
        return 200
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
