import { VerifyUserPayload } from '../../../types/user'
import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<VerifyUserPayload | null>(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await userModel.findOne({ uuid: body.uuid, verificationCodeExpAt: { $gt: new Date(Date.now()) } }).select('+verificationCode +verificationCodeExpAt')
        if (!user) {
            return createError({ statusCode: 404, statusMessage: 'Possible issues: Invalid user, expired verification code, or user already verified.' })
        }
        const isVerificationCodeCorrect = await compareStrings(body.code as unknown as string, user.verificationCode!)
        if (!isVerificationCodeCorrect) {
            return createError({ statusCode: 400, statusMessage: 'Invalid verification code.' })
        }
        user.verified = true
        user.verificationCode = undefined
        user.verificationCodeExpAt = undefined
        user.save()

        const token = signToken({ uuid: user.uuid }, useRuntimeConfig().TOKEN_SECRET, '15m')
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
