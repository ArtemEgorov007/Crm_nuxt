<script setup lang="ts">
import {useQuery} from '@tanstack/vue-query'
import {COLLECTION_DEALS, DB_ID} from '~~/app.constants'
import type {IDeal} from '~~/types/deals.types'
import {EnumStatus} from '~~/types/deals.types'

useSeoMeta({
  title: 'Дашборд | CRM'
})

const {data: dealsData, isLoading: isLoadingDeals} = useQuery({
  queryKey: ['deals-metrics'],
  queryFn: async () => {
    try {
      const response = await DB.listDocuments(DB_ID, COLLECTION_DEALS)
      return response.documents as unknown as IDeal[]
    } catch (error) {
      console.error('Error fetching deals for metrics:', error)
      throw new Error('Не удалось загрузить данные для метрик')
    }
  }
})

const metrics = computed(() => {
  if (!dealsData.value) return null

  const deals = dealsData.value
  const totalDeals = deals.length
  const totalValue = deals.reduce((sum, deal) => sum + (deal.price || 0), 0)

  const statusCounts = {
    [EnumStatus.todo]: 0,
    [EnumStatus['to-be-agreed']]: 0,
    [EnumStatus['in-progress']]: 0,
    [EnumStatus.produced]: 0,
    [EnumStatus.done]: 0
  }

  deals.forEach(deal => {
    if (deal.status in statusCounts) {
      statusCounts[deal.status as EnumStatus]++
    }
  })

  const conversionRate = totalDeals > 0 ? (statusCounts[EnumStatus.done] / totalDeals) * 100 : 0

  return {
    totalDeals,
    totalValue,
    statusCounts,
    conversionRate
  }
})

const recentDeals = computed(() => {
  if (!dealsData.value) return []

  return [...dealsData.value]
      .sort((a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
      .slice(0, 5)
})

const statusLabels = {
  [EnumStatus.todo]: 'Входящие',
  [EnumStatus['to-be-agreed']]: 'На согласовании',
  [EnumStatus['in-progress']]: 'В производстве',
  [EnumStatus.produced]: 'Произведено',
  [EnumStatus.done]: 'К отгрузке'
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Дашборд</h1>
      <p class="dashboard-subtitle">Обзор ключевых метрик вашей CRM</p>
    </header>

    <div v-if="metrics && !isLoadingDeals" class="metrics-grid">
      <UiCard class="metric-card">
        <UiCardContent>
          <div class="metric-header">
            <Icon name="mdi:file-document-multiple" size="24" class="metric-icon"/>
            <h3 class="metric-title">Всего сделок</h3>
          </div>
          <div class="metric-value">{{ metrics.totalDeals }}</div>
        </UiCardContent>
      </UiCard>

      <UiCard class="metric-card">
        <UiCardContent>
          <div class="metric-header">
            <Icon name="mdi:currency-rub" size="24" class="metric-icon"/>
            <h3 class="metric-title">Общая сумма</h3>
          </div>
          <div class="metric-value">{{ metrics.totalValue.toLocaleString('ru-RU') }} ₽</div>
        </UiCardContent>
      </UiCard>

      <UiCard class="metric-card">
        <UiCardContent>
          <div class="metric-header">
            <Icon name="mdi:chart-line" size="24" class="metric-icon"/>
            <h3 class="metric-title">Конверсия</h3>
          </div>
          <div class="metric-value">{{ metrics.conversionRate.toFixed(1) }}%</div>
        </UiCardContent>
      </UiCard>

      <UiCard class="metric-card">
        <UiCardContent>
          <div class="metric-header">
            <Icon name="mdi:check-circle" size="24" class="metric-icon"/>
            <h3 class="metric-title">Завершено</h3>
          </div>
          <div class="metric-value">{{ metrics.statusCounts[EnumStatus.done] }}</div>
        </UiCardContent>
      </UiCard>
    </div>

    <div v-else-if="isLoadingDeals" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка метрик...</p>
    </div>

    <div v-if="metrics && !isLoadingDeals" class="section">
      <h2 class="section-title">Сделки по статусам</h2>
      <div class="status-grid">
        <UiCard
            v-for="(count, status) in metrics.statusCounts"
            :key="status"
            class="status-card"
        >
          <UiCardContent>
            <h3 class="status-title">{{ statusLabels[status as EnumStatus] }}</h3>
            <div class="status-count">{{ count }}</div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>

    <div v-if="recentDeals.length > 0" class="section">
      <h2 class="section-title">Последние сделки</h2>
      <UiCard class="recent-deals-card">
        <UiCardContent>
          <div class="recent-deals-list">
            <div
                v-for="deal in recentDeals"
                :key="deal.$id"
                class="recent-deal-item"
            >
              <div class="deal-info">
                <div class="deal-company">{{ deal.customer.name }}</div>
                <div class="deal-name">{{ deal.name }}</div>
              </div>
              <div class="deal-meta">
                <div class="deal-price">{{ deal.price.toLocaleString('ru-RU') }} ₽</div>
                <div class="deal-date">{{ new Date(deal.$createdAt).toLocaleDateString('ru-RU') }}</div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <div class="section">
      <h2 class="section-title">Интеграция внешних данных</h2>
      <ExternalDataDemo/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.dashboard
  padding: var(--spacing-6)
  max-width: 1200px
  margin: 0 auto

.dashboard-header
  margin-bottom: var(--spacing-6)

.dashboard-title
  font-size: var(--font-size-3xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)
  margin-bottom: var(--spacing-2)

.dashboard-subtitle
  font-size: var(--font-size-base)
  color: var(--color-text-secondary)

.metrics-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))
  gap: var(--spacing-4)
  margin-bottom: var(--spacing-6)

.metric-card
  border-radius: var(--radius-lg)
  border: var(--border-width) solid var(--color-border)

.metric-header
  display: flex
  align-items: center
  gap: var(--spacing-2)
  margin-bottom: var(--spacing-3)

.metric-icon
  color: var(--color-primary)

.metric-title
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  margin: 0

.metric-value
  font-size: var(--font-size-2xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

.loading-container
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

.section
  margin-bottom: var(--spacing-6)

.section-title
  font-size: var(--font-size-xl)
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)
  margin-bottom: var(--spacing-4)

.status-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))
  gap: var(--spacing-4)

.status-card
  border-radius: var(--radius-lg)
  border: var(--border-width) solid var(--color-border)

.status-title
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  margin: 0 0 var(--spacing-2) 0

.status-count
  font-size: var(--font-size-2xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

.recent-deals-card
  border-radius: var(--radius-lg)
  border: var(--border-width) solid var(--color-border)

.recent-deals-list
  display: flex
  flex-direction: column
  gap: var(--spacing-3)

.recent-deal-item
  display: flex
  justify-content: space-between
  align-items: center
  padding: var(--spacing-3)
  border-radius: var(--radius-md)
  transition: background-color var(--transition-normal) ease

  &:hover
    background-color: var(--color-bg)

.deal-info
  flex: 1

.deal-company
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)
  margin-bottom: var(--spacing-1)

.deal-name
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)

.deal-meta
  display: flex
  flex-direction: column
  align-items: flex-end
  gap: var(--spacing-1)

.deal-price
  font-weight: var(--font-weight-bold)
  color: var(--color-primary)

.deal-date
  font-size: var(--font-size-xs)
  color: var(--color-text-tertiary)

@media (max-width: 768px)
  .dashboard
    padding: var(--spacing-4)

  .metrics-grid
    grid-template-columns: 1fr 1fr

  .status-grid
    grid-template-columns: repeat(2, 1fr)
</style>