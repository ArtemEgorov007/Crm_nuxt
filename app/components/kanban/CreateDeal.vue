<script setup lang="ts">
import {ref} from 'vue'
import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {v4 as uuid} from 'uuid'
import {useForm} from 'vee-validate'

import {COLLECTION_DEALS, DB_ID} from '~~/app.constants'
import type {IDeal} from '~~/types/deals.types'

interface IDealFormState {
  name: string
  price: number
  customer: {
    name: string
    email: string
  }
  status: string
}

const props = defineProps({
  status: {type: String, default: 'todo'}
})

const emit = defineEmits<{
  (e: 'deal-created'): void
}>()

const isOpenForm = ref(false)
const toggleForm = () => (isOpenForm.value = !isOpenForm.value)

const queryClient = useQueryClient()

const {handleSubmit, defineField, handleReset} = useForm<IDealFormState>({
  initialValues: {
    status: props.status,
    name: '',
    price: 0,
    customer: {name: '', email: ''}
  }
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const {mutate, isPending} = useMutation({
  mutationKey: ['create-deal'],
  mutationFn: async (data: IDealFormState) => {
    const dealData: Partial<IDeal> = {
      name: data.name,
      price: data.price,
      status: data.status as any,
      customer: {
        name: data.customer.name,
        email: data.customer.email
      },
      $id: uuid(),
      $createdAt: new Date().toISOString()
    }

    return DB.createDocument(DB_ID, COLLECTION_DEALS, dealData.$id!, dealData)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['deals']})
    handleReset()
    isOpenForm.value = false
    emit('deal-created')
  },
  onError: (error) => {
    console.error('Ошибка при создании сделки:', error)
  }
})

const onSubmit = handleSubmit(values => mutate(values))
</script>

<template>
  <div class="create-deal-container">
    <Icon
        v-if="!isOpenForm"
        name="line-md:plus-square"
        width="48"
        height="48"
        class="icon-btn icon-large-open"
        @click="toggleForm"
    />

    <transition name="fade-slide">
      <form
          v-if="isOpenForm"
          class="deal-form"
          @submit.prevent="onSubmit"
      >
        <div class="form-header">
          <Icon
              name="line-md:remove"
              width="32"
              height="32"
              class="icon-btn icon-large-close"
              @click="toggleForm"
          />
        </div>

        <UiInput
            id="deal-name"
            v-model="name"
            v-bind="nameAttrs"
            label="Наименование сделки"
            placeholder="Введите название сделки"
            type="text"
            required
        />

        <UiInput
            id="deal-price"
            v-model.number="price"
            v-bind="priceAttrs"
            label="Сумма (₽)"
            placeholder="Введите сумму"
            type="number"
            required
        />

        <UiInput
            id="customer-email"
            v-model="customerEmail"
            v-bind="customerEmailAttrs"
            label="Email клиента"
            placeholder="Введите email клиента"
            type="email"
            required
        />

        <UiInput
            id="customer-name"
            v-model="customerName"
            v-bind="customerNameAttrs"
            label="Имя компании"
            placeholder="Введите имя компании"
            type="text"
            required
        />

        <UiButton
            type="submit"
            variant="primary"
            size="md"
            block
            :loading="isPending"
        >
          {{ isPending ? 'Создание...' : 'Добавить сделку' }}
        </UiButton>
      </form>
    </transition>
  </div>
</template>

<style scoped lang="sass">
.create-deal-container
  margin-bottom: var(--spacing-3)

.icon-btn
  cursor: pointer
  transition: transform 0.2s ease
  color: var(--color-primary)

  &:hover
    transform: scale(1.1)

.icon-large-open
  width: 100%
  display: flex
  justify-content: center
  padding: var(--spacing-2)

.deal-form
  display: flex
  flex-direction: column
  gap: var(--spacing-4)
  padding: var(--spacing-4)
  background-color: var(--color-bg)
  border-radius: var(--radius-lg)
  box-shadow: var(--shadow-md)
  border: var(--border-width) solid var(--color-border)

.form-header
  display: flex
  justify-content: flex-end

.fade-slide-enter-active,
.fade-slide-leave-active
  transition: all 0.3s ease

.fade-slide-enter-from,
.fade-slide-leave-to
  transform: translateY(-20px)
  opacity: 0
</style>
