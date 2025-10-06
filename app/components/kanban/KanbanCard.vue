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

const formatDate = (dateString: string) => {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffInDays = now.diff(date, 'day');
  
  if (diffInDays === 0) {
    return 'Сегодня';
  } else if (diffInDays === 1) {
    return 'Вчера';
  } else if (diffInDays < 7) {
    return `${diffInDays} дней назад`;
  } else {
    return date.format('DD MMMM YYYY');
  }
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
      <div class="card-header">
        <UiCardTitle tag="h2" class="card-company">
          {{ card.companyName }}
        </UiCardTitle>
        <div class="card-price">
          {{ card.price?.toLocaleString('ru-RU') }} ₽
        </div>
      </div>
      
      <UiCardDescription>
        <div class="card-name">{{ card.name }}</div>
        <div class="card-meta">
          <span class="card-date">{{ formatDate(card.$createdAt) }}</span>
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
  transition: all var(--transition-normal) ease
  border: var(--border-width) solid var(--color-card-border)
  user-select: none

  &:hover
    box-shadow: var(--shadow-md)
    transform: translateY(-2px)
    border-color: var(--color-primary-light)

  &:active
    cursor: grabbing

.card-header
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-bottom: var(--spacing-2)

.card-company
  font-size: var(--font-size-base)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)
  flex: 1
  margin-right: var(--spacing-2)

.card-price
  font-size: var(--font-size-lg)
  font-weight: var(--font-weight-bold)
  color: var(--color-primary)
  white-space: nowrap

.card-name
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  margin-bottom: var(--spacing-3)
  line-height: 1.4

.card-meta
  display: flex
  justify-content: space-between
  font-size: var(--font-size-xs)
  color: var(--color-text-tertiary)

.card-date
  display: flex
  align-items: center
  gap: var(--spacing-1)

.status-badge
  font-size: var(--font-size-xs)
  font-weight: var(--font-weight-medium)
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)
  text-transform: uppercase

  &--todo
    background-color: rgba(250, 204, 21, 0.1)
    color: var(--color-warning)

  &--to-be-agreed
    background-color: rgba(249, 115, 22, 0.1)
    color: #f97316

  &--in-progress
    background-color: rgba(59, 130, 246, 0.1)
    color: var(--color-primary)

  &--produced
    background-color: rgba(147, 51, 234, 0.1)
    color: #9333ea

  &--done
    background-color: rgba(34, 197, 94, 0.1)
    color: var(--color-success)
</style>