import mongoose from 'mongoose'
import { UserSchema } from '../../types/user'

const userSchema = new mongoose.Schema<UserSchema>({
    uuid: {
        type: Number,
        required: [true, 'UUID is required.'],
        index: {
            unique: true
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z\s-]+$/.test(value)
            },
            message: 'Invalid First Name'
        }
    },
    lastName: {
        type: String,
        required: [true, 'First name is required.'],
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[a-zA-Z\s-]+$/.test(value)
            },
            message: 'Invalid First Name'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        validate: {
            validator: function (value: string) {
                return /^\S+@\S+\.\S+$/.test(value)
            },
            message: 'Invalid email.'
        },
        index: {
            unique: true
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        minlength: [10, 'Password is too short.']
    },
    verificationCode: {
        type: String,
        select: false
    },
    verificationCodeExpAt: {
        type: Date,
        select: false
    },
    resetPassword: {
        type: String,
        select: false
    },
    resetPasswordExpAt: {
        type: Date,
        select: false
    }
}, { timestamps: true })

export default mongoose.model<UserSchema>('User', userSchema)
