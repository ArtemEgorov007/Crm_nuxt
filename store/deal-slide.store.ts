import {defineStore} from 'pinia'
import type {ICard} from "../app/components/kanban/kanban.types";

interface DealSlideState {
    card: ICard | null
    isOpen: boolean
}

const defaultValue: DealSlideState = {
    card: null,
    isOpen: false,
}

export const useDealSlideStore = defineStore('deal-slide', {
    state: (): DealSlideState => ({...defaultValue}),
    actions: {
        clear() {
            this.$patch({...defaultValue})
        },
        set(card: ICard) {
            this.$patch({card, isOpen: true})
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
    },
})
