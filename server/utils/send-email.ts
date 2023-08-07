import { EmailBody } from '../../types/email'

interface EmailData {
    email: string[]
    body: EmailBody
    mergeFields: object
    from: string
    replyTo: string
    subject: string
}
async function sendEmail(emailData: EmailData): Promise<boolean> {
    const emails = emailData.email.map((email) => {
        return {
            Email: email,
            Fields: emailData.mergeFields

        }
    })
    try {
        await $fetch(`${useRuntimeConfig().public.ELASTIC_URL}/emails`, {
            method: 'POST',
            headers: {
                'X-ElasticEmail-ApiKey': useRuntimeConfig().ELASTIC_API
            },
            body: {
                Recipients: emails,
                Content: {
                    Body: [emailData.body],
                    Headers: emailData.mergeFields,
                    EnvelopeFrom: emailData.from,
                    From: emailData.from,
                    ReplyTo: emailData.replyTo,
                    Subject: emailData.subject
                }
            }
        })
        return true
    } catch (error) {
        return false
    }
}

export default sendEmail
