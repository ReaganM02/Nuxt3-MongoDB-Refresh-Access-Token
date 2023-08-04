import mongoose from "mongoose"

export const useUserModel = () => {
    const userSchema = new mongoose.Schema({

    })
    return mongoose.model('User', userSchema)
}