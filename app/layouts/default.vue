<script lang="ts" setup></script>

<template>
  <div class="layout">
    <LayoutSidebar/>
    <main class="layout__main">
      <slot/>
    </main>
  </div>
</template>

<style lang="sass" scoped>
.layout
  display: flex
  min-height: 100vh
  width: 100vw
  overflow-x: hidden

.layout__main
  padding: var(--spacing-4)
  width: 100%
  min-height: 100vh
  transition: margin-left var(--transition-normal) ease
</style>
