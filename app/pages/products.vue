<script setup lang="ts"></script>

<template>
  <div class="products-container">
    <div class="header">
      <h1 class="title">Продукты</h1>
      <p class="subtitle">Управление каталогом продуктов и услуг</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <UiInput
            placeholder="Поиск по продуктам..."
            type="search"
        />
      </div>
      <div class="toolbar-actions">
        <UiButton
            variant="primary"
            size="md"
        >
          Добавить продукт
        </UiButton>
        <UiButton
            variant="outline"
            size="md"
        >
          Категории
        </UiButton>
      </div>
    </div>

    <div class="stats-cards">
      <UiCard class="stat-card">
        <UiCardContent>
          <div class="stat-content">
            <div class="stat-icon products">
              <Icon name="heroicons:archive-box"/>
            </div>
            <div class="stat-info">
              <div class="stat-label">Всего продуктов</div>
              <div class="stat-value">142</div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="stat-card">
        <UiCardContent>
          <div class="stat-content">
            <div class="stat-icon active">
              <Icon name="heroicons:clock"/>
            </div>
            <div class="stat-info">
              <div class="stat-label">Активных</div>
              <div class="stat-value">128</div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard class="stat-card">
        <UiCardContent>
          <div class="stat-content">
            <div class="stat-icon categories">
              <Icon name="heroicons:squares-2x2"/>
            </div>
            <div class="stat-info">
              <div class="stat-label">Категорий</div>
              <div class="stat-value">24</div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>

    <UiCard class="products-card">
      <UiCardHeader>
        <UiCardTitle tag="h2">Каталог продуктов</UiCardTitle>
      </UiCardHeader>

      <UiCardContent>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">
              <div class="image-placeholder">
                <Icon name="heroicons:photo" class="image-icon"/>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">CRM Премиум</h3>
              <p class="product-description">Полнофункциональная система управления взаимоотношениями с клиентами</p>
              <div class="product-meta">
                <span class="product-price">125 000 ₽</span>
                <span class="product-category">Программное обеспечение</span>
              </div>
              <div class="product-actions">
                <UiButton variant="ghost" size="sm">Редактировать</UiButton>
                <UiButton variant="ghost" size="sm" class="danger">Удалить</UiButton>
              </div>
            </div>
          </div>

          <div class="product-card">
            <div class="product-image">
              <div class="image-placeholder">
                <Icon name="heroicons:cube-transparent" class="image-icon"/>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">Консультации</h3>
              <p class="product-description">Профессиональные консультации по внедрению CRM решений</p>
              <div class="product-meta">
                <span class="product-price">15 000 ₽/час</span>
                <span class="product-category">Услуги</span>
              </div>
              <div class="product-actions">
                <UiButton variant="ghost" size="sm">Редактировать</UiButton>
                <UiButton variant="ghost" size="sm" class="danger">Удалить</UiButton>
              </div>
            </div>
          </div>

          <div class="product-card">
            <div class="product-image">
              <div class="image-placeholder">
                <Icon name="heroicons:information-circle" class="image-icon"/>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">Техподдержка</h3>
              <p class="product-description">Круглосуточная техническая поддержка клиентов</p>
              <div class="product-meta">
                <span class="product-price">25 000 ₽/мес</span>
                <span class="product-category">Подписка</span>
              </div>
              <div class="product-actions">
                <UiButton variant="ghost" size="sm">Редактировать</UiButton>
                <UiButton variant="ghost" size="sm" class="danger">Удалить</UiButton>
              </div>
            </div>
          </div>

          <div class="product-card">
            <div class="product-image">
              <div class="image-placeholder">
                <Icon name="heroicons:document-text" class="image-icon"/>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">Документация</h3>
              <p class="product-description">Полная документация и руководства пользователя</p>
              <div class="product-meta">
                <span class="product-price">Бесплатно</span>
                <span class="product-category">Ресурсы</span>
              </div>
              <div class="product-actions">
                <UiButton variant="ghost" size="sm">Редактировать</UiButton>
                <UiButton variant="ghost" size="sm" class="danger">Удалить</UiButton>
              </div>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<style scoped lang="sass">
.products-container
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
  line-height: var(--line-height-normal)

.toolbar
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  align-items: flex-start
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

.stat-card .stat-content
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

  &.products
    background-color: rgba(59, 130, 246, 0.1)
    color: var(--color-primary)

  &.active
    background-color: rgba(34, 197, 94, 0.1)
    color: var(--color-success)

  &.categories
    background-color: rgba(245, 158, 11, 0.1)
    color: var(--color-accent)

.stat-info
  flex: 1

.stat-label
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)

.stat-value
  font-size: var(--font-size-xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)

.products-card
  overflow: hidden

.products-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: var(--spacing-6)

.product-card
  display: flex
  flex-direction: column
  border: var(--border-width) solid var(--color-card-border)
  border-radius: var(--radius-lg)
  background-color: var(--color-card-bg)
  overflow: hidden
  transition: box-shadow var(--transition-normal) ease, transform var(--transition-normal) ease

  &:hover
    box-shadow: var(--shadow-md)
    transform: translateY(-2px)

.product-image
  height: 180px
  background-color: var(--color-bg-secondary)
  display: flex
  align-items: center
  justify-content: center

.image-placeholder
  color: var(--color-text-tertiary)
  opacity: 0.5

.image-icon
  width: 48px
  height: 48px
  color: var(--color-icon, #888)

.product-info
  padding: var(--spacing-4)
  display: flex
  flex-direction: column
  gap: var(--spacing-3)

.product-name
  font-size: var(--font-size-lg)
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)

.product-description
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)
  line-height: var(--line-height-normal)

.product-meta
  display: flex
  justify-content: space-between
  align-items: center
  flex-wrap: wrap
  gap: var(--spacing-2)

.product-price
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)

.product-category
  background-color: var(--color-bg-tertiary)
  color: var(--color-text-secondary)
  font-size: var(--font-size-xs)
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)

.product-actions
  display: flex
  gap: var(--spacing-2)

  .danger
    color: var(--color-danger)

    &:hover
      background-color: rgba(239, 68, 68, 0.1)

.stat-icon .icon
  width: 24px
  height: 24px

@media (max-width: 768px)
  .products-container
    padding: var(--spacing-4)

  .toolbar
    flex-direction: column
    align-items: stretch

  .search-box
    max-width: 100%

  .toolbar-actions
    width: 100%
    flex-direction: column

  .stats-cards
    grid-template-columns: 1fr

  .products-grid
    grid-template-columns: 1fr
</style>
