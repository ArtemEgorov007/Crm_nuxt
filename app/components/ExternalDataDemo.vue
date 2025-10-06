<script setup lang="ts">
import { useExternalData } from '~/composables/useExternalData'

const { externalData, isLoading, error, fetchExternalData } = useExternalData()

// Fetch data when component is mounted
onMounted(() => {
  fetchExternalData()
})

// Function to refresh data
const refreshData = () => {
  fetchExternalData()
}
</script>

<template>
  <div class="external-data-demo">
    <div class="demo-header">
      <h2 class="demo-title">Внешние данные</h2>
      <button 
        class="refresh-button" 
        @click="refreshData" 
        :disabled="isLoading"
      >
        <Icon 
          name="mdi:refresh" 
          :class="{ 'spinning': isLoading }" 
        />
        {{ isLoading ? 'Обновление...' : 'Обновить' }}
      </button>
    </div>

    <div v-if="isLoading" class="demo-loading">
      <div class="spinner"></div>
      <p>Загрузка внешних данных...</p>
    </div>

    <div v-else-if="error" class="demo-error">
      <Icon name="mdi:alert-circle" size="24" />
      <p>Ошибка: {{ error }}</p>
      <button class="retry-button" @click="refreshData">
        Повторить
      </button>
    </div>

    <div v-else-if="externalData" class="demo-content">
      <p class="demo-description">
        Эти данные были загружены из внешнего источника:
      </p>
      
      <div class="data-list">
        <div 
          v-for="item in externalData" 
          :key="item.id"
          class="data-item"
        >
          <div class="item-header">
            <h3 class="item-name">{{ item.name }}</h3>
            <span class="item-value">{{ item.value.toLocaleString('ru-RU') }} ₽</span>
          </div>
          <div class="item-meta">
            ID: {{ item.id }}
          </div>
        </div>
      </div>
      
      <div class="demo-info">
        <Icon name="mdi:information" size="16" />
        <p>Этот компонент демонстрирует как можно интегрировать внешние данные в вашу CRM систему.</p>
      </div>
    </div>

    <div v-else class="demo-empty">
      <p>Нет данных для отображения</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.external-data-demo
  background-color: var(--color-card-bg)
  border-radius: var(--radius-lg)
  padding: var(--spacing-5)
  box-shadow: var(--shadow-sm)
  border: var(--border-width) solid var(--color-border)
  margin: var(--spacing-6) 0

.demo-header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: var(--spacing-4)

.demo-title
  font-size: var(--font-size-xl)
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)
  margin: 0

.refresh-button
  display: flex
  align-items: center
  gap: var(--spacing-2)
  background-color: var(--color-primary)
  color: white
  border: none
  padding: var(--spacing-2) var(--spacing-3)
  border-radius: var(--radius-md)
  cursor: pointer
  font-weight: var(--font-weight-medium)
  transition: background-color var(--transition-normal) ease

  &:hover:not(:disabled)
    background-color: var(--color-primary-hover)

  &:disabled
    opacity: 0.7
    cursor: not-allowed

  .spinning
    animation: spin 1s linear infinite

@keyframes spin
  to
    transform: rotate(360deg)

.demo-loading,
.demo-empty
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

.demo-error
  display: flex
  flex-direction: column
  align-items: center
  gap: var(--spacing-3)
  padding: var(--spacing-6)
  color: var(--color-error-text)
  text-align: center

.retry-button
  background-color: var(--color-primary)
  color: white
  border: none
  padding: var(--spacing-2) var(--spacing-4)
  border-radius: var(--radius-md)
  cursor: pointer
  font-weight: var(--font-weight-medium)
  transition: background-color var(--transition-normal) ease

  &:hover
    background-color: var(--color-primary-hover)

.demo-description
  color: var(--color-text-secondary)
  margin-bottom: var(--spacing-4)

.data-list
  display: flex
  flex-direction: column
  gap: var(--spacing-3)
  margin-bottom: var(--spacing-4)

.data-item
  padding: var(--spacing-4)
  background-color: var(--color-bg)
  border-radius: var(--radius-md)
  border: var(--border-width) solid var(--color-border)

.item-header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: var(--spacing-2)

.item-name
  font-weight: var(--font-weight-semibold)
  color: var(--color-text)
  margin: 0

.item-value
  font-weight: var(--font-weight-bold)
  color: var(--color-primary)

.item-meta
  font-size: var(--font-size-xs)
  color: var(--color-text-tertiary)

.demo-info
  display: flex
  align-items: flex-start
  gap: var(--spacing-2)
  padding: var(--spacing-3)
  background-color: var(--color-bg-secondary)
  border-radius: var(--radius-md)
  font-size: var(--font-size-sm)
  color: var(--color-text-secondary)

  p
    margin: 0
</style>