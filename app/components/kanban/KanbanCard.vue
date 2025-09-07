<script setup lang="ts">
import type {ICard} from '~/components/kanban/kanban.types'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import {useDealSlideStore} from '~~/store/deal-slide.store'

dayjs.locale('ru')

const props = defineProps<{
  card: ICard
  columnId: string
}>()

const emit = defineEmits<{
  (e: 'dragstart'): void
  (e: 'dragend'): void
}>()

const dealSlideStore = useDealSlideStore()

const handleDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData('text/plain', props.card.id)
  event.dataTransfer!.effectAllowed = 'move'
  emit('dragstart')
}

const handleDragEnd = () => {
  emit('dragend')
}

const handleOpenSlideover = () => {
  dealSlideStore.set(props.card)
}
</script>

<template>
  <UiCard
      class="kanban-card"
      draggable="true"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @click="handleOpenSlideover"
  >
    <UiCardContent>
      <UiCardTitle tag="h2" class="card-company">
        {{ card.companyName }}
      </UiCardTitle>
      <UiCardDescription>
        <div class="card-name">{{ card.name }}</div>
        <div class="card-meta">
          <span>{{ card.price?.toLocaleString('ru-RU') }} ₽</span>
          <span>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</span>
        </div>
      </UiCardDescription>
    </UiCardContent>

    <UiCardFooter>
      <span class="status-badge" :class="`status-badge--${columnId}`">
        {{ card.status }}
      </span>
    </UiCardFooter>
  </UiCard>
</template>

<style scoped lang="sass">
.kanban-card
  padding: var(--spacing-4)
  border-radius: var(--radius-md)
  background-color: var(--color-card-bg)
  box-shadow: var(--shadow-sm)
  cursor: grab
  transition: box-shadow var(--transition-normal) ease
  border: var(--border-width) solid var(--color-card-border)
  user-select: none

  &:hover
    box-shadow: var(--shadow-md)
    transform: translateY(-2px)

  &:active
    cursor: grabbing

.card-company
  font-size: var(--font-size-base)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)
  margin-bottom: var(--spacing-2)

.card-name
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  margin-bottom: var(--spacing-2)

.card-meta
  display: flex
  justify-content: space-between
  font-size: var(--font-size-xs)
  color: var(--color-text-tertiary)

.status-badge
  font-size: var(--font-size-xs)
  font-weight: var(--font-weight-medium)
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)
  text-transform: uppercase

  &--todo
    background-color: rgba(250, 204, 21, 0.1)
    color: var(--color-warning)

  &--progress
    background-color: rgba(59, 130, 246, 0.1)
    color: var(--color-primary)

  &--done
    background-color: rgba(34, 197, 94, 0.1)
    color: var(--color-success)
</style>
