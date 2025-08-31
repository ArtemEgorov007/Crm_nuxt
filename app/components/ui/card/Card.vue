<script setup lang="ts"></script>

<template>
  <div class="card">
    <slot/>
  </div>
</template>

<style scoped lang="sass">
.card
  display: block
  border: var(--border-width) solid var(--color-card-border)
  border-radius: var(--radius-lg)
  box-shadow: var(--shadow-sm)
  background-color: var(--color-card-bg)
  overflow: hidden
  opacity: 0
  animation: show 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards
  transition: box-shadow var(--transition-normal) ease-in-out, transform var(--transition-normal) ease-in-out

  &:hover
    box-shadow: var(--shadow-lg)
    transform: translateY(-2px)

  &[draggable="true"]:active
    cursor: grabbing

  &[draggable="true"]::-webkit-draggable-region
    border-radius: var(--radius-lg)

@keyframes show
  0%
    opacity: 0
    transform: scale(0.8) translateY(20px)
  70%
    opacity: 1
    transform: scale(1.02) translateY(-5px)
  100%
    opacity: 1
    transform: scale(1) translateY(0)
</style>
