<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {useMutation} from '@tanstack/vue-query'
import {v4 as uuid} from 'uuid'

import {COLLECTION_DEALS, DB_ID} from '~~/app.constants'
import type {IDeal} from '~~/types/deals.types'

const isOpenForm = ref(false)
const toggleForm = () => (isOpenForm.value = !isOpenForm.value)

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
  customer: {
    name: string
    email: string
  }
  status: string
}

const props = defineProps({
  status: {type: String, default: ''},
  refetch: {type: Function}
})

const {handleSubmit, defineField, handleReset} = useForm<IDealFormState>({
  initialValues: {status: props.status}
})

const [name, nameAttrs] = defineField('name')
const [price, priceAttrs] = defineField('price')
const [customerEmail, customerEmailAttrs] = defineField('customer.email')
const [customerName, customerNameAttrs] = defineField('customer.name')

const {mutate, isPending} = useMutation({
  mutationKey: ['create-deal'],
  mutationFn: (data: IDealFormState) =>
      DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
  onSuccess: () => {
    props.refetch?.()
    handleReset()
  }
})

const onSubmit = handleSubmit(values => mutate(values))
</script>

<template>
  <Icon
      v-if="!isOpenForm"
      name="line-md:plus-square"
      width="64"
      height="64"
      class="icon-btn icon-large-open"
      @click="toggleForm"
  />

  <transition name="fade-slide">
    <form
        v-if="isOpenForm"
        class="deal-form"
        @submit="onSubmit"
    >
      <div class="form-header">
        <Icon
            name="line-md:remove"
            width="48"
            height="48"
            class="icon-btn icon-large-close"
            @click="toggleForm"
        />
      </div>

      <UiInput
          id="deal-name"
          v-model="name"
          v-bind="nameAttrs"
          label="Имя"
          placeholder="Наименование"
          type="text"
          required
      />

      <UiInput
          id="deal-sum"
          v-model="price"
          v-bind="priceAttrs"
          label="Сумма"
          placeholder="Сумма"
          type="number"
          required
      />

      <UiInput
          id="deal-email"
          v-model="customerEmail"
          v-bind="customerEmailAttrs"
          label="Email"
          placeholder="Email"
          type="email"
          required
      />

      <UiInput
          id="deal-company"
          v-model="customerName"
          v-bind="customerNameAttrs"
          label="Компания"
          placeholder="Компания"
          type="text"
          required
      />

      <UiButton
          type="submit"
          variant="primary"
          size="lg"
          block
          :disabled="isPending"
      >
        {{ isPending ? 'Загрузка...' : 'Добавить' }}
      </UiButton>
    </form>
  </transition>
</template>

<style scoped lang="sass">
.icon-btn
  cursor: pointer
  transition: transform 0.2s ease

  &:hover
    transform: scale(1.1)

.icon-large-open
  width: 100%
  scale: 1.2

.deal-form
  display: flex
  flex-direction: column
  gap: var(--spacing-4)
  padding: var(--spacing-4)
  background-color: var(--color-bg-secondary)
  border-radius: var(--radius-lg)
  box-shadow: var(--shadow-sm)

.form-header
  display: flex
  justify-content: flex-end
  margin-bottom: var(--spacing-2)

.fade-slide-enter-active,
.fade-slide-leave-active
  transition: all 0.3s ease

.fade-slide-enter-from,
.fade-slide-leave-to
  transform: translateY(-20px)
  opacity: 0
</style>
