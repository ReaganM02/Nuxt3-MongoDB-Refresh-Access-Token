import { Error } from 'mongoose'
import { MongoError } from 'mongodb'
import { UserRequestBody } from '../../../types/user'
import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<UserRequestBody | null>(event)
        if (!body) {
            return createError({ statusCode: 400, statusMessage: 'Bad request.' })
        }
        const verificationCode = generateUuid(6)
        const user = await userModel.create({
            uuid: generateUuid(19),
            firstName: sanitize(body.firstName),
            lastName: sanitize(body.lastName),
            email: sanitize(body.email),
            password: await hashStrings(body.password),
            verificationCode: await hashStrings(verificationCode),
            verificationCodeExpAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        })
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
        return user.uuid
    } catch (error: unknown) {
        if (error instanceof Error.ValidationError) {
            return createError({ statusCode: 400, statusMessage: 'Bad request', data: Object.values(error.errors).map(err => ({ [err.path]: err.message })) })
        }
        if (error instanceof MongoError) {
            return createError({ statusCode: 409, statusMessage: 'Email already exist' })
        }
        return createError({ statusCode: 500, statusMessage: 'Something went wrong' })
    }
})
