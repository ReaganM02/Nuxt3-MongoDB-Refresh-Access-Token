import bcrypt from 'bcrypt'

async function hashStrings(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, 12)
    return hash
}

export default hashStrings
