import JWT from 'jsonwebtoken'

interface VerifyPayload {
    uuid: number
    iat: number
    exp: number
}

function verifyToken(tokenString: string, tokenKey: string): VerifyPayload | false {
    try {
        return JWT.verify(tokenString, tokenKey) as unknown as VerifyPayload
    } catch (error) {
        return false
    }
}

export default verifyToken
