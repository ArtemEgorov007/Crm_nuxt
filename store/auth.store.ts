import {defineStore} from 'pinia'

interface IUser {
    email: string
    name: string
    status: boolean
}

interface IAuthState {
    user: IUser
}

interface ILoadingState {
    isLoading: boolean
}

const defaultUser: IUser = {
    email: '',
    name: '',
    status: false
}

export const useAuthStore = defineStore('auth', {
    state: (): IAuthState => ({
        user: {...defaultUser}
    }),

    getters: {
        isAuth: (state) => state.user.status,
        userEmail: (state) => state.user.email,
        userName: (state) => state.user.name
    },

    actions: {
        clear() {
            this.user = {...defaultUser}
        },

        set(userData: IUser) {
            this.user = {...userData}
        },

        updateAuthStatus(status: boolean) {
            this.user.status = status
        }
    }
})

export const useIsLoadingStore = defineStore('isLoading', {
    state: (): ILoadingState => ({
        isLoading: true
    }),

    actions: {
        set(value: boolean) {
            this.isLoading = value
        }
    }
})
