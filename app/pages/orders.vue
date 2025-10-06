<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

type OrderStatus = 'pending' | 'shipped' | 'completed'

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: OrderStatus
}

useSeoMeta({
  title: 'Заказы | CRM System'
})

const { data: ordersData, isLoading } = useQuery({
  queryKey: ['orders'],
  queryFn: async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      {id: 'ORD-001', customer: 'ООО "Ромашка"', date: '2023-06-15', amount: 125000, status: 'completed'},
      {id: 'ORD-002', customer: 'ИП Иванов А.В.', date: '2023-06-18', amount: 87000, status: 'pending'},
      {id: 'ORD-003', customer: 'АО "Сатурн"', date: '2023-06-20', amount: 210000, status: 'shipped'},
      {id: 'ORD-004', customer: 'ООО "Меркурий"', date: '2023-06-22', amount: 153000, status: 'completed'},
      {id: 'ORD-005', customer: 'ИП Петров В.С.', date: '2023-06-25', amount: 92000, status: 'pending'}
    ]
  }
})

const statusLabels: Record<OrderStatus, string> = {
  pending: 'В обработке',
  shipped: 'Отправлен',
  completed: 'Завершен'
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'var(--color-warning)',
  shipped: 'var(--color-info)',
  completed: 'var(--color-success)'
}

const formatAmount = (amount: number) =>
    new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(amount)

const createOrder = () => {
  console.log('Создание нового заказа')
}

const searchQuery = ref('')

const filteredOrders = computed(() =>
    ordersData.value && searchQuery.value
        ? ordersData.value.filter(order =>
            order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        : ordersData.value || []
)

const stats = computed(() => {
  if (!ordersData.value) return null
  
  return {
    total: ordersData.value.length,
    totalAmount: ordersData.value.reduce((sum, order) => sum + order.amount, 0)
  }
})
</script>

<template>
  <div class="orders-container">
    <div class="header">
      <h1 class="title">Заказы</h1>
      <p class="subtitle">Управление заказами клиентов</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <UiInput
            v-model="searchQuery"
            placeholder="Поиск по заказам..."
            type="search"
        />
      </div>
      <UiButton
          variant="primary"
          size="md"
          @click="createOrder"
      >
        <Icon name="heroicons:plus" />
        Создать заказ
      </UiButton>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка заказов...</p>
    </div>

    <div v-else>
      <div class="statistics">
        <UiCard>
          <UiCardContent>
            <div class="stat-item">
              <div class="stat-label">Всего заказов</div>
              <div class="stat-value">{{ stats?.total || 0 }}</div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardContent>
            <div class="stat-item">
              <div class="stat-label">Общая сумма</div>
              <div class="stat-value">
                {{ formatAmount(stats?.totalAmount || 0) }}
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <UiCard class="orders-card">
        <UiCardHeader>
          <UiCardTitle tag="h2">Список заказов</UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <div v-if="filteredOrders.length === 0" class="empty-state">
            <Icon name="heroicons:inbox" class="empty-icon" />
            <p>Заказы не найдены</p>
          </div>
          
          <div v-else class="table-container">
            <table class="orders-table">
              <thead>
              <tr>
                <th>ID заказа</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="order-id">{{ order.id }}</td>
                <td class="customer">{{ order.customer }}</td>
                <td class="date">{{ order.date }}</td>
                <td class="amount">{{ formatAmount(order.amount) }}</td>
                <td class="status">
                    <span
                        class="status-badge"
                        :style="{ color: statusColors[order.status] }"
                    >
                      {{ statusLabels[order.status] }}
                    </span>
                </td>
                <td class="actions">
                  <UiButton variant="ghost" size="sm">
                    <Icon name="heroicons:eye" />
                    Открыть
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
.orders-container
  max-width: 1200px
  margin: 0 auto
  padding: var(--spacing-6)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

.header
  margin-bottom: var(--spacing-6)

.title
  font-size: var(--font-size-4xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)
  margin-bottom: var(--spacing-3)

.subtitle
  font-size: var(--font-size-lg)
  color: var(--color-text-secondary)
  line-height: var(--line-height-normal)

.toolbar
  display: flex
  justify-content: space-between
  align-items: center
  gap: var(--spacing-3)
  margin-bottom: var(--spacing-6)

.search-box
  flex: 1
  max-width: 400px

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

.orders-card
  margin-bottom: var(--spacing-6)

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
  overflow-x: auto

.orders-table
  width: 100%
  border-collapse: collapse
  font-size: var(--font-size-base)

  th, td
    padding: var(--spacing-3) var(--spacing-4)
    border-bottom: var(--border-width) solid var(--color-border)
    text-align: left
    white-space: nowrap

  th
    font-weight: var(--font-weight-semibold)
    color: var(--color-text-secondary)

  td
    color: var(--color-text)

  tbody tr:hover
    background-color: var(--color-bg-secondary)

.order-id
  font-weight: var(--font-weight-medium)
  color: var(--color-primary)

.amount
  font-weight: var(--font-weight-medium)

.status-badge
  display: inline-block
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)
  font-weight: var(--font-weight-medium)
  background-color: rgba(59, 130, 246, 0.1)

.actions .icon
  width: 16px
  height: 16px
  margin-right: var(--spacing-1)

.statistics
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
  gap: var(--spacing-6)

.stat-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: var(--spacing-4) 0

.stat-label
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  margin-bottom: var(--spacing-2)

.stat-value
  font-size: var(--font-size-2xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

@keyframes spin
  to
    transform: rotate(360deg)

@media (max-width: 768px)
  .orders-container
    padding: var(--spacing-4)

  .toolbar
    flex-direction: column
    align-items: stretch

  .search-box
    max-width: 100%

  .orders-table th, .orders-table td
    padding: var(--spacing-2) var(--spacing-3)
    font-size: var(--font-size-sm)

  .statistics
    grid-template-columns: 1fr
</style>