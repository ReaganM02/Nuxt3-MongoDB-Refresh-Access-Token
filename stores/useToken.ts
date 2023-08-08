interface State {
    accessToken: string | null
}

export const useToken = defineStore('useToken', {
    state: (): State => ({
        accessToken: null
    })
})
