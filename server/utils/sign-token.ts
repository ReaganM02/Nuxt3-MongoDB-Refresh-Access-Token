import JWT from 'jsonwebtoken'

function signToken(payload: object, secretKey: string): string {
    const sign = JWT.sign(payload, secretKey, {
        expiresIn: '30d'
    })
    return sign
}
export default signToken
