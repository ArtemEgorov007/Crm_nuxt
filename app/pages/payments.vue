<script setup lang="ts">
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
          Новый платеж
        </UiButton>
        <UiButton
            variant="outline"
            size="md"
        >
          Экспорт
        </UiButton>
      </div>
    </div>

    <div class="stats-cards">
      <UiCard class="stat-card">
        <UiCardContent>
          <div class="stat-content">
            <div class="stat-icon income">
              <Icon name="heroicons:arrow-down"/>
            </div>
            <div class="stat-info">
              <div class="stat-label">Входящие</div>
              <div class="stat-value">1 250 000 ₽</div>
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
              <div class="stat-value">850 000 ₽</div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="stat-card">
        <UiCardContent>
          <div class="stat-content">
            <div class="stat-icon balance">
              <Icon name="heroicons:currency-dollar"/>
            </div>
            <div class="stat-info">
              <div class="stat-label">Баланс</div>
              <div class="stat-value">400 000 ₽</div>
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
        <div class="table-container">
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
            <tr>
              <td class="payment-id">PAY-001</td>
              <td class="customer">ООО "Ромашка"</td>
              <td class="date">15.06.2023</td>
              <td class="amount positive">+125 000 ₽</td>
              <td class="status">
                <span class="status-badge completed">Завершен</span>
              </td>
              <td class="method">Банковский перевод</td>
              <td class="actions">
                <UiButton variant="ghost" size="sm">Подробнее</UiButton>
              </td>
            </tr>
            <tr>
              <td class="payment-id">PAY-002</td>
              <td class="customer">ИП Иванов А.В.</td>
              <td class="date">18.06.2023</td>
              <td class="amount negative">-87 000 ₽</td>
              <td class="status">
                <span class="status-badge pending">В обработке</span>
              </td>
              <td class="method">Картой</td>
              <td class="actions">
                <UiButton variant="ghost" size="sm">Подробнее</UiButton>
              </td>
            </tr>
            <tr>
              <td class="payment-id">PAY-003</td>
              <td class="customer">АО "Сатурн"</td>
              <td class="date">20.06.2023</td>
              <td class="amount positive">+210 000 ₽</td>
              <td class="status">
                <span class="status-badge completed">Завершен</span>
              </td>
              <td class="method">Банковский перевод</td>
              <td class="actions">
                <UiButton variant="ghost" size="sm">Подробнее</UiButton>
              </td>
            </tr>
            <tr>
              <td class="payment-id">PAY-004</td>
              <td class="customer">ООО "Меркурий"</td>
              <td class="date">22.06.2023</td>
              <td class="amount negative">-153 000 ₽</td>
              <td class="status">
                <span class="status-badge failed">Отменен</span>
              </td>
              <td class="method">Картой</td>
              <td class="actions">
                <UiButton variant="ghost" size="sm">Подробнее</UiButton>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </UiCardContent>
    </UiCard>
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

  &.completed
    background-color: rgba(34, 197, 94, 0.1)
    color: var(--color-success)

  &.pending
    background-color: rgba(245, 158, 11, 0.1)
    color: var(--color-accent)

  &.failed
    background-color: rgba(239, 68, 68, 0.1)
    color: var(--color-danger)

.actions
  min-width: 120px

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
</style>
