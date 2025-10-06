<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const toggle = () => {
  toggleTheme()
}
</script>

<template>
  <button 
    class="theme-toggle" 
    @click="toggle"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <Icon 
      v-if="theme === 'light'" 
      name="heroicons:moon" 
      class="theme-icon"
    />
    <Icon 
      v-else 
      name="heroicons:sun" 
      class="theme-icon"
    />
  </button>
</template>

<style scoped lang="sass">
.theme-toggle
  display: flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  border-radius: var(--radius-full)
  background-color: var(--color-button-secondary-bg)
  border: var(--border-width) solid var(--color-border)
  color: var(--color-text)
  cursor: pointer
  transition: all var(--transition-normal) ease
  outline: none

  &:hover
    background-color: var(--color-button-secondary-bg-hover)
    border-color: var(--color-border-hover)

  &:focus
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5)

.theme-icon
  width: 20px
  height: 20px
</style>