<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<template>
  <span
      class="ui-badge"
      :class="[
      `ui-badge--${variant}`,
      `ui-badge--${size}`
    ]"
  >
    <slot/>
  </span>
</template>

<style scoped lang="sass">
.ui-badge
  display: inline-flex
  align-items: center
  justify-content: center
  border-radius: var(--radius-full)
  font-weight: var(--font-weight-medium)
  white-space: nowrap
  transition: all var(--transition-fast) ease

  &--sm
    padding: var(--spacing-1) var(--spacing-2)
    font-size: var(--font-size-xs)

  &--md
    padding: var(--spacing-1) var(--spacing-2)
    font-size: var(--font-size-sm)

  &--lg
    padding: var(--spacing-2) var(--spacing-3)
    font-size: var(--font-size-base)

  &--primary
    background-color: rgba(59, 130, 246, 0.1)
    color: var(--color-primary)
    border: var(--border-width) solid var(--color-primary)

  &--secondary
    background-color: rgba(100, 116, 139, 0.1)
    color: var(--color-secondary)
    border: var(--border-width) solid var(--color-secondary)

  &--success
    background-color: rgba(34, 197, 94, 0.1)
    color: var(--color-success)
    border: var(--border-width) solid var(--color-success)

  &--warning
    background-color: rgba(250, 204, 21, 0.1)
    color: var(--color-warning)
    border: var(--border-width) solid var(--color-warning)

  &--danger
    background-color: rgba(239, 68, 68, 0.1)
    color: var(--color-danger)
    border: var(--border-width) solid var(--color-danger)

  &--info
    background-color: rgba(14, 165, 233, 0.1)
    color: var(--color-info)
    border: var(--border-width) solid var(--color-info)
</style>
