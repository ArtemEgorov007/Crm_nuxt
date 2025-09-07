<script lang="ts" setup>
import {useQuery} from '@tanstack/vue-query'
import {COLLECTION_CUSTOMERS, DB_ID} from '~~/app.constants'
import type {ICustomer} from '~~/types/deals.types'

useSeoMeta({title: 'Customers | CRM System'})

const {data: customers, isLoading} = useQuery({
  queryKey: ['customers'],
  queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
})
</script>

<template>
  <div class="customers">
    <header class="customers__header">
      <h1 class="customers__title">Наши клиенты</h1>
    </header>

    <div v-if="isLoading" class="customers__loading">
      <div class="customers__spinner"/>
      <p>Загрузка данных...</p>
    </div>

    <div v-else class="customers__table-wrapper">
      <table class="customers__table">
        <thead class="customers__table-header">
        <tr>
          <th class="customers__th customers__th--image">Изображение</th>
          <th class="customers__th customers__th--name">Наименование</th>
          <th class="customers__th customers__th--email">Email</th>
          <th class="customers__th customers__th--source">Откуда пришел</th>
        </tr>
        </thead>
        <tbody class="customers__table-body">
        <tr
            v-for="customer in (customers?.documents as unknown as ICustomer[])"
            :key="customer.$id"
            class="customers__tr"
        >
          <td class="customers__td">
            <NuxtLink :href="`/customers/edit/${customer.$id}`" class="customers__avatar-link">
              <img
                  :src="customer.avatar_url"
                  :alt="customer.name"
                  width="50"
                  height="50"
                  class="customers__avatar"
                  loading="lazy"
              />
            </NuxtLink>
          </td>
          <td class="customers__td customers__td--name">{{ customer.name }}</td>
          <td class="customers__td customers__td--email">{{ customer.email }}</td>
          <td class="customers__td customers__td--source">{{ customer.from_source }}</td>
        </tr>

        <tr v-if="!customers?.documents?.length" class="customers__tr customers__tr--empty">
          <td :colspan="4" class="customers__td customers__td--empty">
            Нет данных для отображения
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
    margin-bottom: var(--spacing-10)

  &__title
    font-size: var(--font-size-2xl)
    font-weight: var(--font-weight-bold)
    color: var(--color-text)

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
      width: 200px

    &--name
      width: 300px

    &--email
      width: 200px

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

    &--empty
      text-align: center
      color: var(--color-text-tertiary)
      font-style: italic
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

@keyframes spin
  to
    transform: rotate(360deg)
</style>
