<script setup lang="ts">
import dayjs from 'dayjs'
import {useDealSlideStore} from '~~/store/deal-slide.store'

const store = useDealSlideStore()

const formatDate = (date?: string): string =>
    date ? dayjs(date).format('DD MMMM YYYY') : '—'

const formatCurrency = (value?: number): string =>
    typeof value === 'number' ? `${value.toLocaleString('ru-RU')} ₽` : '—'
</script>

<template>
  <div class="deal-info">
    <h3 class="deal-info__title">О сделке</h3>

    <KanbanSlideoverLabel label-text="Наименование">
      <h2 class="deal-info__value deal-info__value--heading">{{ store.card?.name || '—' }}</h2>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Сумма">
      <span class="deal-info__value">{{ formatCurrency(store.card?.price) }}</span>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Статус">
      <UiBadge variant="primary">
        {{ store.card?.status || '—' }}
      </UiBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Клиент">
      <span class="deal-info__value">{{ store.card?.companyName || '—' }}</span>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Дата создания">
      <span class="deal-info__value">{{ formatDate(store.card?.$createdAt) }}</span>
    </KanbanSlideoverLabel>
  </div>
</template>

<style scoped lang="sass">
.deal-info
  border: var(--border-width) solid var(--color-border)
  background-color: var(--color-bg-secondary)
  border-radius: var(--radius-md)
  padding: var(--spacing-4)
  margin-bottom: var(--spacing-4)

  &__title
    text-transform: uppercase
    font-weight: var(--font-weight-bold)
    font-size: var(--font-size-lg)
    margin-bottom: var(--spacing-4)
    color: var(--color-text)

  &__value
    font-size: var(--font-size-base)
    color: var(--color-text)
    line-height: var(--line-height-normal)

    &--heading
      font-weight: var(--font-weight-semibold)
      font-size: var(--font-size-xl)
      margin: 0
      color: var(--color-text)

  :deep(.slideover-label)
    margin-bottom: var(--spacing-3)

    &:last-child
      margin-bottom: 0

  :deep(.slideover-label__text)
    font-size: var(--font-size-sm)
    font-weight: var(--font-weight-medium)
    color: var(--color-text-secondary)
    margin-bottom: var(--spacing-1)
</style>
