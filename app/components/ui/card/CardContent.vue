<script setup lang="ts"></script>

<template>
  <div class="card-content">
    <slot/>
  </div>
</template>

<style lang="sass" scoped>
.card-content
  padding: var(--spacing-6)
  background-color: var(--color-card-bg)
  color: var(--color-text)
</style>
