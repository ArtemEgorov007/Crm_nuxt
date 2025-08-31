<script setup lang="ts"></script>

<template>
  <div class="card-header">
    <slot/>
  </div>
</template>

<style lang="sass" scoped>
.card-header
  padding: var(--spacing-5) var(--spacing-6) var(--spacing-4) var(--spacing-6)
  border-bottom: var(--border-width) solid var(--color-card-border)
  background-color: var(--color-card-bg)
  font-weight: var(--font-weight-semibold)
  font-size: var(--font-size-lg)
  color: var(--color-text)
</style>
