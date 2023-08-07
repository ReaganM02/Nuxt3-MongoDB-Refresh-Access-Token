import { EmailBody, EmailTemplate } from '../../types/email'

async function getEmailTemplate(templateName: string): Promise<EmailBody | false> {
    try {
        const template: EmailTemplate = await $fetch(`${useRuntimeConfig().public.ELASTIC_URL}/templates/${templateName}`, {
            headers: {
                'X-ElasticEmail-ApiKey': useRuntimeConfig().ELASTIC_API
            }
        })
        return template.Body[0]
    } catch (error) {
        return false
    }
}

export default getEmailTemplate
