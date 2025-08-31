<script setup lang="ts"></script>

<template>
  <div class="feedback-container">
    <div class="header">
      <h1 class="title">Обратная связь</h1>
      <p class="subtitle">Ваше мнение важно для нас. Поделитесь своими мыслями и предложениями.</p>
    </div>

    <UiCard class="feedback-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Отправить сообщение</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <form class="feedback-form">
          <div class="form-group">
            <UiInput
                id="name"
                label="Имя"
                placeholder="Введите ваше имя"
                type="text"
                required
            />
          </div>

          <div class="form-group">
            <UiInput
                id="email"
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
                class="form-select"
                required
            >
              <option value="">Выберите тему</option>
              <option value="support">Техническая поддержка</option>
              <option value="feature">Предложение функции</option>
              <option value="bug">Сообщить об ошибке</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Сообщение</label>
            <textarea
                id="message"
                class="form-textarea"
                rows="5"
                placeholder="Введите ваше сообщение"
                required
            ></textarea>
          </div>

          <div class="form-actions">
            <UiButton type="submit" variant="primary" size="md">Отправить</UiButton>
            <UiButton type="reset" variant="secondary" size="md">Очистить</UiButton>
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
            <span class="contact-label">Email:</span>
            <span class="contact-value">support@mycrm.com</span>
          </div>

          <div class="contact-item">
            <span class="contact-label">Телефон:</span>
            <span class="contact-value">+7 (495) 123-45-67</span>
          </div>

          <div class="contact-item">
            <span class="contact-label">Адрес:</span>
            <span class="contact-value">г. Москва, ул. Примерная, д. 10</span>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<style scoped lang="sass">
.feedback-container
  max-width: 800px
  padding: var(--spacing-6)
  margin: 0 auto

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
    justify-content: space-between
    padding: var(--spacing-3) 0
    border-bottom: var(--border-width) solid var(--color-border)

    &:last-child
      border-bottom: none

  .contact-label
    font-weight: var(--font-weight-medium)
    color: var(--color-text)

  .contact-value
    color: var(--color-text-secondary)
    text-align: right

@media (max-width: var(--breakpoint-md))
  .feedback-container
    padding: var(--spacing-4)

  .form-actions
    flex-direction: column

  .contact-info
    .contact-item
      flex-direction: column
      gap: var(--spacing-1)

    .contact-value
      text-align: left
</style>
