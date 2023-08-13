import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<{ email: string } | null>(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const user = await userModel.findOne({ email: body.email })
        if (!user) {
            return createError({ statusCode: 404, statusMessage: 'Email not found.' })
        }
        if (!user.verified) {
            return createError({ statusCode: 401, statusMessage: 'User not found.' })
        }
        const id = generateUuid(6)
        user.resetPassword = await hashStrings(id)
        user.resetPasswordExpAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        const emailTemplate = await getEmailTemplate('authentication-forgot-password')
        if (!emailTemplate) {
            return createError({ statusCode: 500, statusMessage: 'Apologies, an internal server error while sending verification email. Please contact development team.' })
        }

        const URLLink = `${useRuntimeConfig().APP_URL}/reset-password/?id=${id}&uuid=${user.uuid}`
        const sendAnEmail = await sendEmail({
            body: emailTemplate,
            email: [user.email],
            mergeFields: { firstName: user.firstName, URLLink },
            from: `Reagan M <${useRuntimeConfig().EMAIL}>`,
            replyTo: `Reagan M <${useRuntimeConfig().EMAIL}>`,
            subject: 'Account Recovery: Request Password Reset'
        })
        if (!sendAnEmail) {
            return createError({ statusCode: 500, statusMessage: 'Apologies, an internal server error is hindering the verification email sending. Please contact our development team.' })
        }

        user.save()

        return 200
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
