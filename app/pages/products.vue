<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { COLLECTION_DEALS, DB_ID } from '~~/app.constants'
import type { IDeal } from '~~/types/deals.types'

useSeoMeta({
  title: 'Продукты | CRM System'
})

const { data: productsData, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      {
        id: '1',
        name: 'CRM Премиум',
        description: 'Полнофункциональная система управления взаимоотношениями с клиентами',
        price: 125000,
        category: 'Программное обеспечение',
        image: 'heroicons:archive-box'
      },
      {
        id: '2',
        name: 'Консультации',
        description: 'Профессиональные консультации по внедрению CRM решений',
        price: 15000,
        category: 'Услуги',
        image: 'heroicons:cube-transparent',
        unit: 'час'
      },
      {
        id: '3',
        name: 'Техподдержка',
        description: 'Круглосуточная техническая поддержка клиентов',
        price: 25000,
        category: 'Подписка',
        image: 'heroicons:clock',
        unit: 'мес'
      },
      {
        id: '4',
        name: 'Документация',
        description: 'Полная документация и руководства пользователя',
        price: 0,
        category: 'Ресурсы',
        image: 'heroicons:document-text',
        free: true
      }
    ]
  }
})

const searchQuery = ref('')
const selectedCategory = ref('')

const categories = computed(() => {
  if (!productsData.value) return []
  const uniqueCategories = [...new Set(productsData.value.map(p => p.category))]
  return uniqueCategories.map(category => ({ value: category, label: category }))
})

const filteredProducts = computed(() => {
  if (!productsData.value) return []
  
  return productsData.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const formatPrice = (price: number, unit?: string) => {
  if (price === 0) return 'Бесплатно'
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price)
  const unitSuffix = unit ? `/${unit}` : ''
  return `${formattedPrice} ₽${unitSuffix}`
}

const stats = computed(() => {
  if (!productsData.value) return null
  
  return {
    total: productsData.value.length,
    active: productsData.value.filter(p => p.price > 0).length,
    categories: [...new Set(productsData.value.map(p => p.category))].length
  }
})
</script>

<template>
  <div class="products-container">
    <div class="header">
      <h1 class="title">Продукты</h1>
      <p class="subtitle">Управление каталогом продуктов и услуг</p>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <UiInput
            v-model="searchQuery"
            placeholder="Поиск по продуктам..."
            type="search"
        />
      </div>
      <div class="filters">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">Все категории</option>
          <option 
            v-for="category in categories" 
            :key="category.value" 
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>
      </div>
      <div class="toolbar-actions">
        <UiButton
            variant="primary"
            size="md"
        >
          <Icon name="heroicons:plus" />
          Добавить продукт
        </UiButton>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка продуктов...</p>
    </div>

    <div v-else>
      <div class="stats-cards">
        <UiCard class="stat-card">
          <UiCardContent>
            <div class="stat-content">
              <div class="stat-icon products">
                <Icon name="heroicons:archive-box"/>
              </div>
              <div class="stat-info">
                <div class="stat-label">Всего продуктов</div>
                <div class="stat-value">{{ stats?.total || 0 }}</div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card">
          <UiCardContent>
            <div class="stat-content">
              <div class="stat-icon active">
                <Icon name="heroicons:check-circle"/>
              </div>
              <div class="stat-info">
                <div class="stat-label">Активных</div>
                <div class="stat-value">{{ stats?.active || 0 }}</div>
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
                <div class="stat-value">{{ stats?.categories || 0 }}</div>
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
          <div v-if="filteredProducts.length === 0" class="empty-state">
            <Icon name="heroicons:inbox" class="empty-icon" />
            <p>Продукты не найдены</p>
          </div>
          
          <div v-else class="products-grid">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id"
              class="product-card"
            >
              <div class="product-image">
                <div class="image-placeholder">
                  <Icon :name="product.image" class="image-icon"/>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-meta">
                  <span 
                    class="product-price" 
                    :class="{ 'free': product.free }"
                  >
                    {{ formatPrice(product.price, product.unit) }}
                  </span>
                  <span class="product-category">{{ product.category }}</span>
                </div>
                <div class="product-actions">
                  <UiButton variant="ghost" size="sm">
                    <Icon name="heroicons:pencil" />
                    Редактировать
                  </UiButton>
                  <UiButton variant="ghost" size="sm" class="danger">
                    <Icon name="heroicons:trash" />
                    Удалить
                  </UiButton>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
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

.filters
  .filter-select
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

.toolbar-actions
  display: flex
  gap: var(--spacing-3)
  flex-wrap: wrap

.loading-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: var(--spacing-8)
  color: var(--color-text-secondary)

  .spinner
    width: 32px
    height: 32px
    border: 4px solid var(--color-border)
    border-top: 4px solid var(--color-primary)
    border-radius: 50%
    animation: spin 1s linear infinite
    margin-bottom: var(--spacing-4)

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

.empty-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: var(--spacing-8)
  color: var(--color-text-secondary)
  text-align: center

  .empty-icon
    width: 48px
    height: 48px
    margin-bottom: var(--spacing-4)
    opacity: 0.5

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
  
  &.free
    color: var(--color-success)

.product-category
  background-color: var(--color-bg-tertiary)
  color: var(--color-text-secondary)
  font-size: var(--font-size-xs)
  padding: var(--spacing-1) var(--spacing-2)
  border-radius: var(--radius-full)

.product-actions
  display: flex
  gap: var(--spacing-2)
  margin-top: var(--spacing-2)

  .danger
    color: var(--color-danger)

    &:hover
      background-color: rgba(239, 68, 68, 0.1)

.stat-icon .icon, .product-actions .icon
  width: 16px
  height: 16px
  margin-right: var(--spacing-1)

@keyframes spin
  to
    transform: rotate(360deg)

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