<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

useSeoMeta({
  title: 'Платежи | CRM System'
})

const { data: paymentsData, isLoading } = useQuery({
  queryKey: ['payments'],
  queryFn: async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      {
        id: 'PAY-001',
        customer: 'ООО "Ромашка"',
        date: '2023-06-15',
        amount: 125000,
        status: 'completed',
        method: 'Банковский перевод'
      },
      {
        id: 'PAY-002',
        customer: 'ИП Иванов А.В.',
        date: '2023-06-18',
        amount: -87000,
        status: 'pending',
        method: 'Картой'
      },
      {
        id: 'PAY-003',
        customer: 'АО "Сатурн"',
        date: '2023-06-20',
        amount: 210000,
        status: 'completed',
        method: 'Банковский перевод'
      },
      {
        id: 'PAY-004',
        customer: 'ООО "Меркурий"',
        date: '2023-06-22',
        amount: -153000,
        status: 'failed',
        method: 'Картой'
      },
      {
        id: 'PAY-005',
        customer: 'ИП Петров В.С.',
        date: '2023-06-25',
        amount: 92000,
        status: 'completed',
        method: 'Банковский перевод'
      }
    ]
  }
})

const statusLabels: Record<string, string> = {
  completed: 'Завершен',
  pending: 'В обработке',
  failed: 'Отменен'
}

const statusColors: Record<string, string> = {
  completed: 'var(--color-success)',
  pending: 'var(--color-warning)',
  failed: 'var(--color-danger)'
}

const formatAmount = (amount: number) => {
  const formatted = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(Math.abs(amount))
  
  return amount >= 0 ? `+${formatted}` : `-${formatted}`
}

const amountClass = (amount: number) => {
  return amount >= 0 ? 'positive' : 'negative'
}

const stats = computed(() => {
  if (!paymentsData.value) return null
  
  const income = paymentsData.value
    .filter(p => p.amount > 0)
    .reduce((sum, payment) => sum + payment.amount, 0)
    
  const outcome = paymentsData.value
    .filter(p => p.amount < 0)
    .reduce((sum, payment) => sum + Math.abs(payment.amount), 0)
    
  const balance = income - outcome
  
  return { income, outcome, balance }
})
</script>

<template>
  <div class="payments-container">
    <div class="header">
      <h1 class="title">Платежи</h1>
      <p class="subtitle">Управление финансовыми операциями и платежами</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <UiInput
            placeholder="Поиск по платежам..."
            type="search"
        />
      </div>
      <div class="toolbar-actions">
        <UiButton
            variant="primary"
            size="md"
        >
          <Icon name="heroicons:plus" />
          Новый платеж
        </UiButton>
        <UiButton
            variant="outline"
            size="md"
        >
          <Icon name="heroicons:arrow-down-tray" />
          Экспорт
        </UiButton>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка платежей...</p>
    </div>

    <div v-else>
      <div class="stats-cards">
        <UiCard class="stat-card">
          <UiCardContent>
            <div class="stat-content">
              <div class="stat-icon income">
                <Icon name="heroicons:arrow-down"/>
              </div>
              <div class="stat-info">
                <div class="stat-label">Входящие</div>
                <div class="stat-value">{{ formatAmount(stats?.income || 0) }}</div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card">
          <UiCardContent>
            <div class="stat-content">
              <div class="stat-icon outcome">
                <Icon name="heroicons:arrow-up"/>
              </div>
              <div class="stat-info">
                <div class="stat-label">Исходящие</div>
                <div class="stat-value">{{ formatAmount(stats?.outcome || 0) }}</div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card">
          <UiCardContent>
            <div class="stat-content">
              <div class="stat-icon balance">
                <Icon name="heroicons:currency-ruble"/>
              </div>
              <div class="stat-info">
                <div class="stat-label">Баланс</div>
                <div class="stat-value">{{ formatAmount(stats?.balance || 0) }}</div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard class="payments-card">
        <UiCardHeader>
          <UiCardTitle tag="h2">Последние платежи</UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <div v-if="!paymentsData || paymentsData.length === 0" class="empty-state">
            <Icon name="heroicons:inbox" class="empty-icon" />
            <p>Платежи не найдены</p>
          </div>
          
          <div v-else class="table-container">
            <table class="payments-table">
              <thead>
              <tr>
                <th>ID платежа</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Метод</th>
                <th>Действия</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="payment in paymentsData" :key="payment.id">
                <td class="payment-id">{{ payment.id }}</td>
                <td class="customer">{{ payment.customer }}</td>
                <td class="date">{{ payment.date }}</td>
                <td 
                  class="amount" 
                  :class="amountClass(payment.amount)"
                >
                  {{ formatAmount(payment.amount) }}
                </td>
                <td class="status">
                  <span
                      class="status-badge"
                      :style="{ color: statusColors[payment.status] }"
                  >
                    {{ statusLabels[payment.status] }}
                  </span>
                </td>
                <td class="method">{{ payment.method }}</td>
                <td class="actions">
                  <UiButton variant="ghost" size="sm">
                    <Icon name="heroicons:information-circle" />
                    Подробнее
                  </UiButton>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<style scoped lang="sass">
.payments-container
  max-width: 1200px
  margin: 0 auto
  padding: var(--spacing-6)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

.header
  display: flex
  flex-direction: column
  gap: var(--spacing-2)

.title
  font-size: var(--font-size-4xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

.subtitle
  font-size: var(--font-size-lg)
  color: var(--color-text-secondary)

.toolbar
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  align-items: center
  gap: var(--spacing-3)

.search-box
  flex: 1
  min-width: 240px
  max-width: 400px

.toolbar-actions
  display: flex
  gap: var(--spacing-3)
  flex-wrap: wrap

.loading-state
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

.stats-cards
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: var(--spacing-6)

.stat-card
  .stat-content
    display: flex
    align-items: center
    gap: var(--spacing-4)

  .stat-icon
    display: flex
    align-items: center
    justify-content: center
    width: 56px
    height: 56px
    border-radius: var(--radius-full)

    &.income
      background-color: rgba(34, 197, 94, 0.1)
      color: var(--color-success)

    &.outcome
      background-color: rgba(239, 68, 68, 0.1)
      color: var(--color-danger)

    &.balance
      background-color: rgba(59, 130, 246, 0.1)
      color: var(--color-primary)

  .stat-info
    flex: 1

  .stat-label
    font-size: var(--font-size-sm)
    color: var(--color-text-secondary)

  .stat-value
    font-size: var(--font-size-xl)
    font-weight: var(--font-weight-bold)
    color: var(--color-text)

.payments-card
  overflow: hidden

.empty-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: var(--spacing-8)
  color: var(--color-text-secondary)
  text-align: center

  .empty-icon
    width: 48px
    height: 48px
    margin-bottom: var(--spacing-4)
    opacity: 0.5

.table-container
  width: 100%
  overflow-x: auto
  -webkit-overflow-scrolling: touch

.payments-table
  min-width: 1000px
  width: 100%
  border-collapse: collapse
  font-size: var(--font-size-base)

  th, td
    padding: var(--spacing-3) var(--spacing-4)
    border-bottom: var(--border-width) solid var(--color-border)
    text-align: left
    white-space: nowrap
    max-width: 200px
    overflow: hidden
    text-overflow: ellipsis

  th
    font-weight: var(--font-weight-semibold)
    color: var(--color-text-secondary)

  td
    color: var(--color-text)

  tbody tr:hover
    background-color: var(--color-bg-secondary)

.payment-id
  font-weight: var(--font-weight-medium)
  color: var(--color-primary)

.amount
  font-weight: var(--font-weight-semibold)

  &.positive
    color: var(--color-success)

  &.negative
    color: var(--color-danger)

.status-badge
  display: inline-block
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)
  font-size: var(--font-size-sm)
  font-weight: var(--font-weight-medium)

.actions .icon
  width: 16px
  height: 16px
  margin-right: var(--spacing-1)

@media (max-width: 1200px)
  .payments-container
    padding: var(--spacing-4)
    max-width: 800px

  .toolbar
    flex-direction: column
    align-items: stretch

  .toolbar-actions
    flex-direction: column
    width: 100%

  .search-box
    max-width: 100%

  .stats-cards
    grid-template-columns: 1fr

  .payments-table th, .payments-table td
    padding: var(--spacing-2) var(--spacing-3)
    font-size: var(--font-size-sm)

@keyframes spin
  to
    transform: rotate(360deg)
</style>