import bcrypt from 'bcrypt'

async function compareStrings(plainString: string, encryptedString: string) {
    return await bcrypt.compare(plainString, encryptedString)
}

export default compareStrings
