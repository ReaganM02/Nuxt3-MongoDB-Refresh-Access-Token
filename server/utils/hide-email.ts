function hideEmail(plainEmail: string): string {
    const [username, domain] = plainEmail.split('@')
    const truncateUsername = username.slice(0, 3) + '***'
    return `${truncateUsername}@${domain}`
}

export default hideEmail
