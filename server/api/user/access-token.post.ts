import userModel from '../../models/user.model'

export default defineEventHandler(async (event) => {
    try {
        const header = getHeader(event, 'cookie')
        if (!header || !header.startsWith('authorization')) {
            return createError({ statusCode: 401, statusMessage: 'Unauthorize' })
        }
        const authorization = header.split('=')[1]
        const verify = verifyToken(authorization, useRuntimeConfig().TOKEN_SECRET)
        if (!verify) {
            return createError({ statusCode: 401, statusMessage: 'Unauthorize' })
        }
        const user = await userModel.findOne({ uuid: verify.uuid })
        if (!user) {
            return createError({ statusCode: 401, statusMessage: 'Unauthorize' })
        }
        const token = signToken({ uuid: user.uuid }, useRuntimeConfig().ACCESS_TOKEN, '1hr')
        return token
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
