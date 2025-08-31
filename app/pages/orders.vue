<script setup lang="ts">
type OrderStatus = 'pending' | 'shipped' | 'completed'

interface Order {
  id: string
  customer: string
  date: string
  amount: number
  status: OrderStatus
}

const orders = ref<Order[]>([
  {id: 'ORD-001', customer: 'ООО "Ромашка"', date: '2023-06-15', amount: 12500, status: 'completed'},
  {id: 'ORD-002', customer: 'ИП Иванов А.В.', date: '2023-06-18', amount: 8700, status: 'pending'},
  {id: 'ORD-003', customer: 'АО "Сатурн"', date: '2023-06-20', amount: 21000, status: 'shipped'},
  {id: 'ORD-004', customer: 'ООО "Меркурий"', date: '2023-06-22', amount: 15300, status: 'completed'},
  {id: 'ORD-005', customer: 'ИП Петров В.С.', date: '2023-06-25', amount: 9200, status: 'pending'}
])

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
    searchQuery.value
        ? orders.value.filter(order =>
            order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
        : orders.value
)
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
        Создать заказ
      </UiButton>
    </div>

    <UiCard class="orders-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Список заказов</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <div class="table-container">
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
                <UiButton variant="ghost" size="sm">Открыть</UiButton>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="6" class="empty-state">
                Заказы не найдены
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </UiCardContent>
    </UiCard>

    <div class="statistics">
      <UiCard>
        <UiCardContent>
          <div class="stat-item">
            <div class="stat-label">Всего заказов</div>
            <div class="stat-value">{{ orders.length }}</div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardContent>
          <div class="stat-item">
            <div class="stat-label">Общая сумма</div>
            <div class="stat-value">
              {{ formatAmount(orders.reduce((sum, order) => sum + order.amount, 0)) }}
            </div>
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

.orders-card
  margin-bottom: var(--spacing-6)

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

.empty-state
  text-align: center
  padding: var(--spacing-8)
  color: var(--color-text-tertiary)

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
