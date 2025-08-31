<script setup lang="ts">
import type {ICard, IColumn} from '~/components/kanban/kanban.types'
import {useKanbanQuery} from '~/components/kanban/useKanbanQuery'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')
useSeoMeta({title: 'Home | CRM System'})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)

const {data, isLoading, refetch} = useKanbanQuery()
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

    <div v-else class="kanban-board">
      <div
          v-for="column in data"
          :key="column.id"
          class="kanban-column"
          :class="`kanban-column--${column.id}`"
      >
        <h2 class="column-title">
          {{ column.name }}
          <span class="column-count">({{ column.items.length }})</span>
        </h2>

        <div class="column-content">
          <UiCard
              v-for="card in column.items"
              :key="card.id"
              class="kanban-card"
              draggable="true"
              @dragstart="dragCardRef = card; sourceColumnRef = column"
              @dragend="dragCardRef = null; sourceColumnRef = null"
          >
            <UiCardContent>
              <UiCardTitle tag="h2">
                <div class="card-company"> {{ card.companyName }}</div>
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
              <span class="status-badge" :class="`status-badge--${column.id}`">{{ card.status }}</span>
            </UiCardFooter>
          </UiCard>

          <p v-if="column.items.length === 0" class="empty-column">Нет сделок</p>
        </div>
      </div>
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

.kanban-column
  flex: 1
  min-width: 280px
  background-color: var(--color-bg-secondary)
  border-radius: var(--radius-lg)
  padding: var(--spacing-4)
  border: var(--border-width) solid var(--color-border)

  &--todo
    border-top: 3px solid var(--color-warning)

  &--progress
    border-top: 3px solid var(--color-primary)

  &--done
    border-top: 3px solid var(--color-success)

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

.kanban-card
  padding: var(--spacing-4)
  border-radius: var(--radius-md)
  background-color: var(--color-card-bg)
  box-shadow: var(--shadow-sm)
  cursor: grab
  transition: box-shadow 0.2s ease

  &:hover
    box-shadow: var(--shadow-md)

.card-company
  font-size: var(--font-size-base)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

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
  font-weight: 500
  padding: 2px 6px
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

.empty-column
  text-align: center
  font-style: italic
  color: var(--color-text-tertiary)
</style>
