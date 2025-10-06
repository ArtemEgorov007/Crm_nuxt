<script lang="ts" setup>
import {useQuery} from '@tanstack/vue-query'
import {COLLECTION_CUSTOMERS, DB_ID} from '~~/app.constants'
import type {ICustomer} from '~~/types/deals.types'

useSeoMeta({title: 'Customers | CRM System'})

const {data: customers, isLoading, isError, error} = useQuery({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
})

const searchQuery = ref('')

const filteredCustomers = computed(() => {
  if (!customers.value?.documents) return []

  const customerList = customers.value.documents as unknown as ICustomer[]

  if (!searchQuery.value) return customerList

  return customerList.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (customer.from_source && customer.from_source.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

const retry = () => {
  window.location.reload()
}
</script>

<template>
  <div class="customers">
    <header class="customers__header">
      <h1 class="customers__title">Наши клиенты</h1>
      <p class="customers__subtitle">Управление базой клиентов</p>
    </header>

    <div class="customers__toolbar">
      <div class="customers__search">
        <UiInput
            v-model="searchQuery"
            placeholder="Поиск клиентов..."
            type="search"
        />
      </div>
      <div class="customers__actions">
        <UiButton variant="primary" size="md">
          <Icon name="heroicons:plus" />
          Добавить клиента
        </UiButton>
      </div>
    </div>

    <div v-if="isLoading" class="customers__loading">
      <div class="customers__spinner"/>
      <p>Загрузка данных...</p>
    </div>

    <div v-else-if="isError" class="customers__error">
      <Icon name="heroicons:exclamation-triangle" class="error-icon" />
      <p>Ошибка загрузки данных: {{ (error as Error).message }}</p>
      <UiButton @click="retry" variant="primary" size="sm">
        Повторить
      </UiButton>
    </div>

    <div v-else class="customers__table-wrapper">
      <table class="customers__table">
        <thead class="customers__table-header">
        <tr>
          <th class="customers__th customers__th--image">Изображение</th>
          <th class="customers__th customers__th--name">Наименование</th>
          <th class="customers__th customers__th--email">Email</th>
          <th class="customers__th customers__th--source">Откуда пришел</th>
          <th class="customers__th customers__th--actions">Действия</th>
        </tr>
        </thead>
        <tbody class="customers__table-body">
        <tr
            v-for="customer in filteredCustomers"
            :key="customer.$id"
            class="customers__tr"
        >
          <td class="customers__td">
            <NuxtLink :href="`/customers/edit/${customer.$id}`" class="customers__avatar-link">
              <img
                  :src="customer.avatar_url || '/placeholder-avatar.png'"
                  :alt="customer.name"
                  width="50"
                  height="50"
                  class="customers__avatar"
                  loading="lazy"
                  @error="($event) => ($event.target as HTMLImageElement).src = '/placeholder-avatar.png'"
              />
            </NuxtLink>
          </td>
          <td class="customers__td customers__td--name">{{ customer.name }}</td>
          <td class="customers__td customers__td--email">{{ customer.email }}</td>
          <td class="customers__td customers__td--source">{{ customer.from_source || 'Не указано' }}</td>
          <td class="customers__td customers__td--actions">
            <div class="customers__actions">
              <UiButton variant="ghost" size="sm">
                <Icon name="heroicons:pencil" />
                Редактировать
              </UiButton>
              <UiButton variant="ghost" size="sm" class="danger">
                <Icon name="heroicons:trash" />
                Удалить
              </UiButton>
            </div>
          </td>
        </tr>

        <tr v-if="filteredCustomers.length === 0" class="customers__tr customers__tr--empty">
          <td :colspan="5" class="customers__td customers__td--empty">
            <div class="empty-state">
              <Icon name="heroicons:inbox" class="empty-icon" />
              <p v-if="searchQuery">Клиенты не найдены</p>
              <p v-else>Нет данных для отображения</p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="sass">
.customers
  max-width: 1200px
  margin: 0 auto
  padding: var(--spacing-6)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

  &__header
    margin-bottom: var(--spacing-6)

  &__title
    font-size: var(--font-size-4xl)
    font-weight: var(--font-weight-bold)
    color: var(--color-text)
    margin-bottom: var(--spacing-2)

  &__subtitle
    font-size: var(--font-size-lg)
    color: var(--color-text-secondary)
    line-height: var(--line-height-normal)

  &__toolbar
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    gap: var(--spacing-3)
    margin-bottom: var(--spacing-6)

  &__search
    flex: 1
    max-width: 400px

  &__actions
    display: flex
    gap: var(--spacing-3)

  &__loading
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: var(--spacing-8)
    color: var(--color-text-secondary)

  &__spinner
    width: 32px
    height: 32px
    border: 4px solid var(--color-border)
    border-top: 4px solid var(--color-primary)
    border-radius: 50%
    animation: spin 1s linear infinite
    margin-bottom: var(--spacing-4)

  &__error
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: var(--spacing-3)
    padding: var(--spacing-8)
    color: var(--color-danger)
    text-align: center

    .error-icon
      width: 48px
      height: 48px

  &__table-wrapper
    overflow-x: auto
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    box-shadow: var(--shadow-sm)

  &__table
    width: 100%
    border-collapse: collapse
    background-color: var(--color-card-bg)

  &__table-header
    background-color: var(--color-bg-secondary)

  &__th
    padding: var(--spacing-4)
    text-align: left
    font-weight: var(--font-weight-semibold)
    color: var(--color-text)
    border-bottom: var(--border-width) solid var(--color-border)

    &--image
      width: 80px

    &--name
      width: 250px

    &--email
      width: 250px

    &--source
      width: 150px

    &--actions
      width: 150px

  &__table-body
    tr:nth-child(even)
      background-color: var(--color-bg-secondary)

  &__tr
    transition: background-color var(--transition-fast) ease

    &:hover
      background-color: var(--color-bg-tertiary) !important

    &--empty:hover
      background-color: transparent !important

  &__td
    padding: var(--spacing-4)
    color: var(--color-text)
    border-bottom: var(--border-width) solid var(--color-border)

    &--name
      font-weight: var(--font-weight-medium)

    &--email
      color: var(--color-primary)

    &--empty
      text-align: center
      color: var(--color-text-tertiary)
      padding: var(--spacing-8)

  &__avatar-link
    display: inline-block
    border-radius: var(--radius-full)
    overflow: hidden
    transition: transform var(--transition-fast) ease

    &:hover
      transform: scale(1.05)

  &__avatar
    display: block
    border-radius: var(--radius-full)
    object-fit: cover
    background-color: var(--color-bg-secondary)

  &__actions
    display: flex
    gap: var(--spacing-2)

    .danger
      color: var(--color-danger)

      &:hover
        background-color: rgba(239, 68, 68, 0.1)

  .icon
    width: 16px
    height: 16px
    margin-right: var(--spacing-1)

.empty-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: var(--spacing-3)

  .empty-icon
    width: 48px
    height: 48px
    opacity: 0.5

@keyframes spin
  to
    transform: rotate(360deg)

@media (max-width: 768px)
  .customers
    padding: var(--spacing-4)

  .customers__toolbar
    flex-direction: column
    align-items: stretch

  .customers__search
    max-width: 100%

  .customers__actions
    width: 100%
    flex-direction: column

  .customers__table
    min-width: 600px

  .customers__th
    padding: var(--spacing-3)

  .customers__td
    padding: var(--spacing-3)

  .customers__th--image
    display: none

  .customers__td--image
    display: none
</style>