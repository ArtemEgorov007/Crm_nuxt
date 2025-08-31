<script setup lang="ts"></script>

<template>
  <div class="card-footer">
    <slot/>
  </div>
</template>

<style lang="sass" scoped>
.card-footer
  padding: var(--spacing-4) var(--spacing-6) var(--spacing-5) var(--spacing-6)
  border-top: var(--border-width) solid var(--color-card-border)
  background-color: var(--color-bg-secondary)
  color: var(--color-text-secondary)
  font-size: var(--font-size-sm)
</style>
