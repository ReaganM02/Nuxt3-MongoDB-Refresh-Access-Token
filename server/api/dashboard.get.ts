import { H3Error } from 'h3'
import { UserData } from '../../types/user'
import userModel from '../models/user.model'

export default defineEventHandler(async (event): Promise<UserData | H3Error> => {
    try {
        const userUUID = await checkAccessToken(event)
        if (!userUUID) {
            return createError({ statusCode: 401, statusMessage: 'Unauthorize' })
        }
        const user = await userModel.findOne({ uuid: userUUID }).select('-_d -__v')
        if (!user) {
            return createError({ statusCode: 401, statusMessage: 'User not found.' })
        }
        user.email = hideEmail(user.email)
        return user as unknown as UserData
    } catch (error) {
        return createError({ statusCode: 500, statusMessage: 'Something went wrong.' })
    }
})
