import { customAlphabet } from 'nanoid'
import nanoidDictionary from 'nanoid-dictionary'

function generateUUID(length: number) {
    const generateUUID = customAlphabet(nanoidDictionary.numbers, length)
    return generateUUID()
}

export default generateUUID
