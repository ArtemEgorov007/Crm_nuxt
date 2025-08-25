<template>
  <div class="loader-wrapper">
    <div class="loader-container">
      <NuxtImg
          src="/loader.svg"
          alt="Загрузка..."
          class="loader-image"
          width="220"
          height="auto"
      />
      <p class="loader-text">Загрузка данных...</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
.loader-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: var(--color-bg)
  display: flex
  align-items: center
  justify-content: center
  z-index: var(--z-index-modal)

.loader-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.loader-image
  max-width: 100%
  height: auto
  margin-bottom: var(--spacing-4)

.loader-text
  color: var(--color-text-secondary)
  font-size: var(--font-size-base)
  font-weight: var(--font-weight-medium)
</style>
