<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()

const subjects = [
  { value: '', label: 'Выберите тему' },
  { value: 'support', label: 'Техническая поддержка' },
  { value: 'feature', label: 'Предложение функции' },
  { value: 'bug', label: 'Сообщить об ошибке' },
  { value: 'other', label: 'Другое' }
]

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const submitForm = () => {
  isSubmitting.value = true
  submitError.value = ''
  
  setTimeout(() => {
    isSubmitting.value = false
    submitSuccess.value = true
    
    formData.name = ''
    formData.email = ''
    formData.subject = ''
    formData.message = ''
    
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  }, 1000)
}

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.subject = ''
  formData.message = ''
  submitError.value = ''
}
</script>

<template>
  <div class="feedback-container">
    <div class="header">
      <h1 class="title">Обратная связь</h1>
      <p class="subtitle">Ваше мнение важно для нас. Поделитесь своими мыслями и предложениями.</p>
    </div>

    <div v-if="submitSuccess" class="success-message">
      <Icon name="heroicons:check-circle" class="success-icon" />
      <p>Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</p>
    </div>

    <UiCard class="feedback-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Отправить сообщение</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <form class="feedback-form" @submit.prevent="submitForm">
          <div class="form-group">
            <UiInput
                id="name"
                v-model="formData.name"
                label="Имя"
                placeholder="Введите ваше имя"
                type="text"
                required
            />
          </div>

          <div class="form-group">
            <UiInput
                id="email"
                v-model="formData.email"
                label="Email"
                placeholder="Введите ваш email"
                type="email"
                required
            />
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Тема</label>
            <select
                id="subject"
                v-model="formData.subject"
                class="form-select"
                required
            >
              <option 
                v-for="subject in subjects" 
                :key="subject.value" 
                :value="subject.value"
              >
                {{ subject.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Сообщение</label>
            <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                rows="5"
                placeholder="Введите ваше сообщение"
                required
            ></textarea>
          </div>

          <div class="form-actions">
            <UiButton 
              type="submit" 
              variant="primary" 
              size="md"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              <Icon v-if="!isSubmitting" name="heroicons:paper-airplane" />
              {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
            </UiButton>
            <UiButton 
              type="reset" 
              variant="secondary" 
              size="md"
              @click="resetForm"
            >
              <Icon name="heroicons:x-mark" />
              Очистить
            </UiButton>
          </div>
        </form>
      </UiCardContent>
    </UiCard>

    <div class="contact-info">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle tag="h3">Контактная информация</UiCardTitle>
        </UiCardHeader>

        <UiCardContent>
          <div class="contact-item">
            <Icon 
              name="heroicons:envelope" 
              class="contact-icon"
              :class="{ 'dark': theme === 'dark' }"
            />
            <div class="contact-details">
              <span class="contact-label">Email:</span>
              <span class="contact-value">support@mycrm.com</span>
            </div>
          </div>

          <div class="contact-item">
            <Icon 
              name="heroicons:phone" 
              class="contact-icon"
              :class="{ 'dark': theme === 'dark' }"
            />
            <div class="contact-details">
              <span class="contact-label">Телефон:</span>
              <span class="contact-value">+7 (495) 123-45-67</span>
            </div>
          </div>

          <div class="contact-item">
            <Icon 
              name="heroicons:map-pin" 
              class="contact-icon"
              :class="{ 'dark': theme === 'dark' }"
            />
            <div class="contact-details">
              <span class="contact-label">Адрес:</span>
              <span class="contact-value">г. Москва, ул. Примерная, д. 10</span>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<style scoped lang="sass">
.feedback-container
  max-width: 1200px
  margin: 0 auto
  padding: var(--spacing-6)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

.header
  margin-bottom: var(--spacing-8)

.title
  color: var(--color-text)
  font-size: var(--font-size-4xl)
  font-weight: var(--font-weight-bold)
  margin-bottom: var(--spacing-3)

.subtitle
  color: var(--color-text-secondary)
  font-size: var(--font-size-lg)
  line-height: var(--line-height-normal)

.success-message
  display: flex
  align-items: center
  gap: var(--spacing-3)
  padding: var(--spacing-4)
  background-color: rgba(34, 197, 94, 0.1)
  border: 1px solid var(--color-success)
  border-radius: var(--radius-md)
  color: var(--color-success)

  .success-icon
    width: 24px
    height: 24px

.feedback-card
  margin-bottom: var(--spacing-6)

.feedback-form
  .form-group
    margin-bottom: var(--spacing-4)

  .form-label
    display: block
    color: var(--color-text)
    font-weight: var(--font-weight-medium)
    margin-bottom: var(--spacing-2)

  .form-select
    width: 100%
    padding: var(--spacing-3) var(--spacing-4)
    border: var(--border-width) solid var(--color-input-border)
    border-radius: var(--radius-md)
    background-color: var(--color-input-bg)
    color: var(--color-input-text)
    font-size: var(--font-size-base)
    line-height: 1.5
    transition: border-color var(--transition-normal) ease

    &:focus
      outline: none
      border-color: var(--color-input-border-focus)
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

  .form-textarea
    width: 100%
    padding: var(--spacing-3) var(--spacing-4)
    border: var(--border-width) solid var(--color-input-border)
    border-radius: var(--radius-md)
    background-color: var(--color-input-bg)
    color: var(--color-input-text)
    font-size: var(--font-size-base)
    line-height: 1.5
    transition: border-color var(--transition-normal) ease
    resize: vertical
    min-height: 120px

    &:focus
      outline: none
      border-color: var(--color-input-border-focus)
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

    &::placeholder
      color: var(--color-input-placeholder)

.form-actions
  display: flex
  gap: var(--spacing-3)
  margin-top: var(--spacing-6)

  .ui-btn
    min-width: 120px

.contact-info
  .contact-item
    display: flex
    align-items: flex-start
    gap: var(--spacing-3)
    padding: var(--spacing-4) 0
    border-bottom: var(--border-width) solid var(--color-border)

    &:last-child
      border-bottom: none

  .contact-icon
    width: 20px
    height: 20px
    color: var(--color-text-secondary)
    margin-top: var(--spacing-1)
    
    &.dark
      color: var(--color-text-tertiary)

  .contact-details
    display: flex
    flex-direction: column
    gap: var(--spacing-1)

  .contact-label
    font-weight: var(--font-weight-medium)
    color: var(--color-text)

  .contact-value
    color: var(--color-text-secondary)

@media (max-width: 768px)
  .feedback-container
    padding: var(--spacing-4)

  .form-actions
    flex-direction: column

  .contact-info
    .contact-item
      flex-direction: column
      gap: var(--spacing-2)

    .contact-details
      flex-direction: row
      justify-content: space-between
      gap: var(--spacing-2)

    .contact-value
      text-align: right
</style>