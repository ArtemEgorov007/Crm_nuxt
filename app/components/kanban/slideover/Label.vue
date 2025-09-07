<script setup lang="ts">
import {defineProps} from 'vue'

defineProps({
  labelText: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="slideover-label">
    <label
        v-if="labelText"
        class="slideover-label__text"
    >
      {{ labelText }}
    </label>

    <div class="slideover-label__value">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.slideover-label
  margin-bottom: var(--spacing-3)

  &__text
    opacity: 0.75
    margin-bottom: var(--spacing-1)
    display: block
    font-size: var(--font-size-xs)
    color: var(--color-text-secondary)
    font-weight: var(--font-weight-normal)

  &__value
    font-size: var(--font-size-base)
    color: var(--color-text)
    line-height: var(--line-height-normal)

  &:last-child
    margin-bottom: 0
</style>
