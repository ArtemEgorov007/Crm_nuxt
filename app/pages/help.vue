<script setup lang="ts">
</script>

<template>
  <div class="help-container">
    <div class="header">
      <h1 class="title">Помощь и поддержка</h1>
      <p class="subtitle">Найдите ответы на часто задаваемые вопросы и получите помощь в использовании CRM-системы</p>
    </div>

    <div class="search-section">
      <div class="search-box">
        <UiInput
            placeholder="Поиск по разделам помощи..."
            class="search-input"
        />
        <UiButton
            class="search-button"
            variant="primary"
            size="md"
        >
          <Icon name="line-md:search"/>
        </UiButton>
      </div>
    </div>

    <div class="content">
      <div class="categories">
        <UiCard class="category-card">
          <UiCardHeader>
            <UiCardTitle tag="h3">Начало работы</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <ul class="links-list">
              <li><a href="#" class="link-item">Регистрация аккаунта</a></li>
              <li><a href="#" class="link-item">Настройка профиля</a></li>
              <li><a href="#" class="link-item">Первые шаги</a></li>
              <li><a href="#" class="link-item">Импорт данных</a></li>
            </ul>
          </UiCardContent>
        </UiCard>

        <UiCard class="category-card">
          <UiCardHeader>
            <UiCardTitle tag="h3">Управление клиентами</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <ul class="links-list">
              <li><a href="#" class="link-item">Добавление клиентов</a></li>
              <li><a href="#" class="link-item">Редактирование информации</a></li>
              <li><a href="#" class="link-item">Сегментация клиентов</a></li>
              <li><a href="#" class="link-item">История взаимодействий</a></li>
            </ul>
          </UiCardContent>
        </UiCard>

        <UiCard class="category-card">
          <UiCardHeader>
            <UiCardTitle tag="h3">Отчеты и аналитика</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <ul class="links-list">
              <li><a href="#" class="link-item">Создание отчетов</a></li>
              <li><a href="#" class="link-item">Фильтрация данных</a></li>
              <li><a href="#" class="link-item">Экспорт отчетов</a></li>
              <li><a href="#" class="link-item">Настройка графиков</a></li>
            </ul>
          </UiCardContent>
        </UiCard>

        <UiCard class="category-card">
          <UiCardHeader>
            <UiCardTitle tag="h3">Интеграции</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <ul class="links-list">
              <li><a href="#" class="link-item">Подключение email</a></li>
              <li><a href="#" class="link-item">Интеграция с календарем</a></li>
              <li><a href="#" class="link-item">API и вебхуки</a></li>
              <li><a href="#" class="link-item">Сторонние сервисы</a></li>
            </ul>
          </UiCardContent>
        </UiCard>
      </div>

      <div class="additional-help">
        <UiCard>
          <UiCardHeader>
            <UiCardTitle tag="h3">Не нашли ответ ?</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="help-text">Наши специалисты готовы помочь вам в любое время.</p>
            <div class="help-actions">
              <UiButton
                  variant="primary"
                  size="md"
              >
                Связаться с поддержкой
              </UiButton>
              <UiButton
                  variant="secondary"
                  size="md"
              >
                Запланировать демонстрацию
              </UiButton>
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.help-container
  max-width: 1200px
  margin: 0 auto
  padding: var(--spacing-6)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

.header
  text-align: center
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
  max-width: 600px
  margin: 0 auto

.search-section
  margin-bottom: var(--spacing-8)

.search-box
  display: flex
  gap: var(--spacing-3)
  max-width: 600px
  margin: 0 auto

  .ui-input
    flex: 1
    margin-bottom: 0

.content
  display: grid
  grid-template-columns: 1fr
  gap: var(--spacing-6)

.categories
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: var(--spacing-6)

.category-card
  height: 100%

.links-list
  list-style: none
  padding: 0
  margin: 0

.link-item
  display: block
  padding: var(--spacing-3) 0
  color: var(--color-text-secondary)
  text-decoration: none
  border-bottom: var(--border-width) solid var(--color-border)
  transition: all var(--transition-fast) ease

  &:hover
    color: var(--color-primary)
    padding-left: var(--spacing-2)

  &:last-child
    border-bottom: none

.additional-help
  .help-text
    color: var(--color-text)
    margin-bottom: var(--spacing-4)

.help-actions
  display: flex
  gap: var(--spacing-3)
  flex-wrap: wrap

@media (max-width: 768px)
  .help-container
    padding: var(--spacing-4)

  .categories
    grid-template-columns: 1fr

  .search-box
    flex-direction: column

  .help-actions
    flex-direction: column

  .ui-btn
    width: 100%
</style>
