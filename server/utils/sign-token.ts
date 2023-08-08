import JWT from 'jsonwebtoken'

function signToken(payload: object, secretKey: string, expiresIn: string): string {
    const sign = JWT.sign(payload, secretKey, {
        expiresIn
    })
    return sign
}
export default signToken
