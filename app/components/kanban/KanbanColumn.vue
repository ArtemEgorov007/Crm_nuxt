<script setup lang="ts">
import type {IColumn, ICard} from '~/components/kanban/kanban.types'
import type {EnumStatus} from '~~/types/deals.types'

import {ref} from 'vue'
import {useMutation, useQueryClient} from '@tanstack/vue-query'

import CreateDeal from '~/components/kanban/CreateDeal.vue'
import {COLLECTION_DEALS, DB_ID} from '~~/app.constants'

const props = defineProps<{
  column: IColumn,
  dragCard: ICard | null,
  sourceColumn: IColumn | null
}>()

const emit = defineEmits<{
  (e: 'dragstart', card: ICard, column: IColumn): void
  (e: 'dragend'): void
  (e: 'card-moved'): void
}>()

const isDragOver = ref(false)
const queryClient = useQueryClient()

const {mutate} = useMutation({
  mutationKey: ['move-card'],
  mutationFn: ({docId, status}: { docId: string; status: EnumStatus }) =>
      DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {status}),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['deals']})
    emit('card-moved')
  }
})

const handleDragStart = (card: ICard, column: IColumn) => {
  emit('dragstart', card, column)
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (targetColumn: IColumn) => {
  isDragOver.value = false

  if (props.dragCard && props.sourceColumn && props.sourceColumn.id !== targetColumn.id) {
    mutate({
      docId: props.dragCard.id,
      status: targetColumn.id as EnumStatus
    })
  }
}

const handleDragEnd = () => {
  emit('dragend')
}
</script>

<template>
  <div
      class="kanban-column"
      :class="[
      `kanban-column--${column.id}`,
      { 'kanban-column--over': isDragOver }
    ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop(column)"
  >
    <h2 class="column-title">
      {{ column.name }}
      <span class="column-count">({{ column.items.length }})</span>
    </h2>

    <CreateDeal :status="column.id"/>

    <div class="column-content">
      <KanbanCard
          v-for="card in column.items"
          :key="card.id"
          :card="card"
          :column-id="column.id"
          @dragstart="handleDragStart(card, column)"
          @dragend="handleDragEnd"
      />

      <p v-if="column.items.length === 0" class="empty-column">Нет сделок</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.kanban-column
  flex: 1
  min-width: 280px
  background-color: var(--color-bg-secondary)
  border-radius: var(--radius-lg)
  padding: var(--spacing-4)
  border: var(--border-width) solid var(--color-border)
  transition: background-color 0.2s ease, box-shadow 0.2s ease

  &--todo
    border-top: 3px solid var(--color-warning)

  &--progress
    border-top: 3px solid var(--color-primary)

  &--done
    border-top: 3px solid var(--color-success)

  &--over
    background-color: rgba(59, 130, 246, 0.08)
    box-shadow: 0 0 0 2px var(--color-primary)

.column-title
  font-size: var(--font-size-lg)
  font-weight: var(--font-weight-semibold)
  margin-bottom: var(--spacing-3)
  display: flex
  justify-content: space-between
  align-items: center

.column-count
  font-size: var(--font-size-sm)
  color: var(--color-text-tertiary)

.column-content
  display: flex
  flex-direction: column
  gap: var(--spacing-3)

.empty-column
  text-align: center
  font-style: italic
  color: var(--color-text-tertiary)
</style>
