export interface UserSchema {
    uuid: number
    firstName: string
    lastName: string
    email: string
    password: string
    verified: boolean
    verificationCode: string | undefined
    verificationCodeExpAt: Date | undefined
    resetPassword: string | undefined
    resetPasswordExpAt: Date | undefined
}
export interface UserRequestBody {
    firstName: string
    lastName: string
    email: string
    password: string
}
export interface SignInRequestBody {
    email: string
    password: string
}
export interface VerifyUserPayload {
    uuid: number
    code: number
}

export interface ReverifyUserPayload {
    uuid: number
}

export interface UserData {
    uuid: number
    firstName: string
    lastName: string
    email: string
    verified: true
    createdAt: Date
    updatedAt: Date
}
