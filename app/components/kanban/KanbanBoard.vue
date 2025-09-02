<script setup lang="ts">
import {useKanbanQuery} from '~/components/kanban/useKanbanQuery'
import type {ICard, IColumn} from '~/components/kanban/kanban.types'

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

const {data, isLoading, refetch} = useKanbanQuery()

const handleDragStart = (card: ICard, column: IColumn) => {
  dragCardRef.value = card
  sourceColumnRef.value = column
}

const handleDragEnd = () => {
  dragCardRef.value = null
  sourceColumnRef.value = null
}
</script>

<template>
  <div class="kanban-container">
    <header class="kanban-header">
      <h1 class="kanban-title">CRM Dashboard</h1>
      <p class="kanban-subtitle">Управление сделками в режиме Kanban</p>
    </header>

    <div v-if="isLoading" class="kanban-state">
      <div class="spinner"/>
      <p>Загрузка данных...</p>
    </div>

    <div v-else-if="data" class="kanban-board">
      <KanbanColumn
          v-for="column in data"
          :key="column.id"
          :column="column"
          :drag-card="dragCardRef"
          :source-column="sourceColumnRef"
          @dragstart="handleDragStart"
          @dragend="handleDragEnd"
          @card-moved="refetch"
      />
    </div>

    <div v-else class="kanban-state">
      <p>Нет данных для отображения</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.kanban-container
  padding: var(--spacing-6)
  overflow-x: auto

.kanban-header
  margin-bottom: var(--spacing-6)

.kanban-title
  font-size: var(--font-size-3xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

.kanban-subtitle
  font-size: var(--font-size-base)
  color: var(--color-text-secondary)

.kanban-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: var(--spacing-8)
  color: var(--color-text-secondary)

.spinner
  width: 32px
  height: 32px
  border: 4px solid var(--color-border)
  border-top: 4px solid var(--color-primary)
  border-radius: 50%
  animation: spin 1s linear infinite
  margin-bottom: var(--spacing-4)

@keyframes spin
  to
    transform: rotate(360deg)

.kanban-board
  display: flex
  gap: var(--spacing-4)
  min-width: 800px
</style>
