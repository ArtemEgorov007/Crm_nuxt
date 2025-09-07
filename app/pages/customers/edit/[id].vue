<script setup lang="ts">
import {useMutation, useQuery} from '@tanstack/vue-query'
import {v4 as uuid} from 'uuid'
import {useRouter, useRoute} from 'vue-router'
import {COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID} from '~~/app.constants'
import type {ICustomer} from '~~/types/deals.types'

interface ICustomerFormState
    extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {
}

useSeoMeta({title: 'Редактирование компании'})

const router = useRouter()
const route = useRoute()
const customerId = route.params.id as string

const {
  handleSubmit,
  defineField,
  setFieldValue,
  setValues,
  values
} = useForm<ICustomerFormState>()

const {data, isSuccess} = useQuery({
  queryKey: ['get customer', customerId],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
  const initial = data.value as ICustomerFormState
  setValues({
    email: initial.email,
    avatar_url: initial.avatar_url,
    from_source: initial.from_source || '',
    name: initial.name
  })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const {mutate, isPending} = useMutation({
  mutationKey: ['update customer', customerId],
  mutationFn: (payload: ICustomerFormState) =>
      DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, payload),
  onSuccess() {
    router.push('/customers')
  }
})

const {mutate: uploadImage, isPending: isUploadImagePending} = useMutation({
  mutationKey: ['upload image'],
  mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
  onSuccess(data) {
    const url = storage.getFileDownload(STORAGE_ID, data.$id)
    setFieldValue('avatar_url', typeof url === 'string' ? url : url.href)
  }
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files?.[0]) {
    uploadImage(target.files[0])
  }
}

const onSubmit = handleSubmit(values => mutate(values))
</script>

<template>
  <div class="customer-edit">
    <header class="customer-edit__header">
      <h1 class="customer-edit__title">
        Редактирование {{ values.name || '...' }}
      </h1>
    </header>

    <form @submit="onSubmit" class="customer-edit__form">
      <div class="customer-edit__group">
        <UiInput
            v-model="name"
            v-bind="nameAttrs"
            label="Наименование"
            placeholder="Наименование"
            type="text"
        />
      </div>

      <div class="customer-edit__group">
        <UiInput
            v-model="email"
            v-bind="emailAttrs"
            label="Email"
            placeholder="Email"
            type="email"
        />
      </div>

      <div class="customer-edit__group">
        <UiInput
            v-model="fromSource"
            v-bind="fromSourceAttrs"
            label="Откуда пришел?"
            placeholder="Источник"
            type="text"
        />
      </div>

      <div class="customer-edit__group">
        <label class="customer-edit__label">Логотип</label>
        <input
            type="file"
            class="customer-edit__file"
            :disabled="isUploadImagePending"
            @change="handleFileChange"
        />
        <div v-if="isUploadImagePending" class="customer-edit__upload-status">
          Загрузка изображения...
        </div>
        <div v-if="values.avatar_url" class="customer-edit__avatar-preview">
          <img
              :src="values.avatar_url"
              alt="Avatar preview"
              class="customer-edit__avatar"
              width="64"
              height="64"
          />
        </div>
      </div>

      <div class="customer-edit__actions">
        <UiButton
            type="submit"
            variant="primary"
            :disabled="isPending"
            :loading="isPending"
        >
          Сохранить
        </UiButton>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">
.customer-edit
  padding: var(--spacing-10)
  max-width: 600px
  margin: 0 auto

  &__header
    margin-bottom: var(--spacing-10)

  &__title
    font-size: var(--font-size-2xl)
    font-weight: var(--font-weight-bold)
    color: var(--color-text)

  &__form
    background-color: var(--color-card-bg)
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    padding: var(--spacing-6)
    box-shadow: var(--shadow-sm)

  &__group
    margin-bottom: var(--spacing-5)

  &__label
    display: block
    margin-bottom: var(--spacing-2)
    font-size: var(--font-size-sm)
    font-weight: var(--font-weight-medium)
    color: var(--color-text)

  &__file
    width: 100%
    padding: var(--spacing-3)
    font-size: var(--font-size-base)
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    background-color: var(--color-input-bg)
    color: var(--color-input-text)

  &__upload-status
    margin-top: var(--spacing-2)
    font-size: var(--font-size-sm)
    color: var(--color-text-secondary)

  &__avatar-preview
    margin-top: var(--spacing-3)

  &__avatar
    display: block
    border-radius: var(--radius-full)
    object-fit: cover
    width: 64px
    height: 64px

  &__actions
    margin-top: var(--spacing-6)
    padding-top: var(--spacing-6)
    border-top: var(--border-width) solid var(--color-border)
</style>
