import mongoSanitize from 'mongo-sanitize'
import xss from 'xss'

function sanitize(data: string): string {
    return xss(mongoSanitize(data))
}

export default sanitize
