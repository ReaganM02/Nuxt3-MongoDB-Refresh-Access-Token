import { ReverifyUserPayload } from '../../../types/user'
import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<ReverifyUserPayload | null>(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await userModel.findOne({ uuid: body.uuid })
        if (!user) {
            return createError({ statusCode: 404, statusMessage: 'User not found.' })
        }
        if (user.verified) {
            return createError({ statusCode: 400, statusMessage: 'Account is already verified, please login' })
        }
        const verificationCode = generateUuid(6)
        user.verificationCode = await hashStrings(verificationCode)
        user.verificationCodeExpAt = new Date(Date.now() + 10 * 60 * 1000)// 10 minutes

        const emailTemplate = await getEmailTemplate('authentication-account-verification')
        if (!emailTemplate) {
            return createError({ statusCode: 500, statusMessage: 'Apologies, an internal server error while sending verification email. Please contact development team.' })
        }
        const sendAnEmail = await sendEmail({
            body: emailTemplate,
            email: [user.email],
            mergeFields: { firstName: user.firstName, code: verificationCode },
            from: `Reagan M <${useRuntimeConfig().EMAIL}>`,
            replyTo: `Reagan M <${useRuntimeConfig().EMAIL}>`,
            subject: 'Account Verification'
        })
        if (!sendAnEmail) {
            return createError({ statusCode: 500, statusMessage: 'Apologies, an internal server error is hindering the verification email sending. Please contact our development team.' })
        }

        user.save()
        return hideEmail(user.email)
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
