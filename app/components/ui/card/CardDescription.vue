<script setup lang="ts"></script>

<template>
  <div class="card-description">
    <slot/>
  </div>
</template>

<style lang="sass" scoped>
.card-description
  color: var(--color-text-secondary)
  line-height: var(--line-height-normal)
</style>
