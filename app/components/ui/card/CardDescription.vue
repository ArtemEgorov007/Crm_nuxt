<script setup lang="ts"></script>

<template>
  <div class="card-description">
    <slot/>
  </div>
</template>

<style lang="sass" scoped>
.card-description
  color: var(--color-text-secondary)
  font-size: var(--font-size-sm)
  line-height: var(--line-height-normal)
  margin: var(--spacing-2) 0
  padding: 0 var(--spacing-4)
</style>
