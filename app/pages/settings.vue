<script setup lang="ts">
</script>

<template>
  <div class="settings-container">
    <div class="header">
      <h1 class="title">Настройки</h1>
      <p class="subtitle">Управляйте своими настройками и предпочтениями</p>
    </div>

    <UiCard class="settings-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Профиль</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <form class="settings-form">
          <div class="form-group">
            <UiInput
                label="Полное имя"
                placeholder="Введите ваше полное имя"
                type="text"
                required
            />
          </div>

          <div class="form-group">
            <UiInput
                label="Email"
                placeholder="Введите ваш email"
                type="email"
                required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Язык интерфейса</label>
            <select class="form-select">
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Тема</label>
            <select class="form-select">
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Часовой пояс</label>
            <select class="form-select">
              <option value="Europe/Moscow">Москва (GMT+3)</option>
              <option value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</option>
              <option value="Asia/Novosibirsk">Новосибирск (GMT+7)</option>
            </select>
          </div>
        </form>
      </UiCardContent>
    </UiCard>

    <UiCard class="settings-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Уведомления</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <div class="notifications-settings">
          <div class="notification-item">
            <label class="checkbox-label">
              <input
                  type="checkbox"
                  class="form-checkbox"
              >
              <span class="checkbox-text">Email уведомления</span>
            </label>
          </div>

          <div class="notification-item">
            <label class="checkbox-label">
              <input
                  type="checkbox"
                  class="form-checkbox"
              >
              <span class="checkbox-text">Push уведомления</span>
            </label>
          </div>

          <div class="notification-item">
            <label class="checkbox-label">
              <input
                  type="checkbox"
                  class="form-checkbox"
              >
              <span class="checkbox-text">SMS уведомления</span>
            </label>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <div class="form-actions">
      <UiButton
          variant="primary"
          size="md"
      >
        Сохранить изменения
      </UiButton>
      <UiButton
          variant="secondary"
          size="md"
      >
        Сбросить
      </UiButton>
    </div>
  </div>
</template>

<style scoped lang="sass">
.settings-container
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

.settings-card
  margin-bottom: var(--spacing-6)

.settings-form
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

.notifications-settings
  .notification-item
    padding: var(--spacing-3) 0
    border-bottom: var(--border-width) solid var(--color-border)

    &:last-child
      border-bottom: none

.checkbox-label
  display: flex
  align-items: center
  cursor: pointer

.form-checkbox
  width: 18px
  height: 18px
  margin-right: var(--spacing-3)
  accent-color: var(--color-primary)

.checkbox-text
  color: var(--color-text)
  font-size: var(--font-size-base)

.form-actions
  display: flex
  gap: var(--spacing-3)
  margin-top: var(--spacing-6)

  .ui-btn
    min-width: 160px

@media (max-width: 768px)
  .settings-container
    padding: var(--spacing-4)

  .form-actions
    flex-direction: column

  .ui-btn
    width: 100%
</style>
