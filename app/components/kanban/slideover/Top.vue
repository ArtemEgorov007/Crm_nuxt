<script setup lang="ts">
import dayjs from 'dayjs'
import {useDealSlideStore} from '~~/store/deal-slide.store'

const store = useDealSlideStore()

const formatDate = (date?: string) =>
    date ? dayjs(date).format('DD MMMM YYYY') : '—'

const convertCurrency = (value: number) => {
  return "";
};
const formatCurrency = (value?: number) =>
    typeof value === 'number' ? convertCurrency(value) : '—'
</script>

<template>
  <div class="deal-info">
    <h3 class="deal-info__title">О сделке</h3>

    <KanbanSlideoverLabel label-text="Наименование">
      <h2>{{ store.card?.name || '—' }}</h2>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Сумма">
      {{ formatCurrency(store.card?.price) }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Статус">
      <UiBadge variant="primary">
        {{ store.card?.status || '—' }}
      </UiBadge>
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Клиент">
      {{ store.card?.companyName || '—' }}
    </KanbanSlideoverLabel>

    <KanbanSlideoverLabel label-text="Дата создания">
      {{ formatDate(store.card?.$createdAt) }}
    </KanbanSlideoverLabel>
  </div>
</template>

<style scoped lang="sass">
.deal-info
  border: 1px solid var(--color-border)
  background-color: rgba(0, 0, 0, 0.2)
  border-radius: var(--radius-md)
  padding: var(--spacing-3)

.deal-info__title
  text-transform: uppercase
  font-weight: var(--font-weight-bold)
  font-size: var(--font-size-xl)
  margin-bottom: var(--spacing-4)
</style>
