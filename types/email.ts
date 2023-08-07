export interface EmailBody {
    ContentType: string
    Content: string
    Charset: string
}

export interface EmailTemplate {
    TemplateType: string
    Name: string
    DateAdded: string
    Subject: string
    Body: EmailBody[]
    TemplateScope: string
}
