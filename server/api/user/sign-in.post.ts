import { SignInRequestBody } from '../../../types/user'
import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<SignInRequestBody | null>(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await userModel.findOne({ email: sanitize(body.email) }).select('+password')
        if (!user) {
            return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
        }
        const isPasswordCorrect = await compareStrings(body.password, user.password)
        if (!isPasswordCorrect) {
            return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
        }
        const token = signToken({ uuid: user.uuid }, useRuntimeConfig().TOKEN_SECRET)
        setCookie(event, 'authorization', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
        return 200
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
