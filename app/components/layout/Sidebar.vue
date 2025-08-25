<script lang="ts" setup>
const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <aside
      class="sidebar"
      :class="{ 'sidebar--collapsed': !isOpen }"
  >
    <div class="sidebar__header">
      <NuxtLink to="/" class="logo-link">
        <NuxtImg
            src="/logo.svg"
            alt="Логотип CRM системы"
            class="logo"
            width="100"
            height="auto"
        />
      </NuxtLink>

      <button class="toggle-btn" @click="toggleSidebar">
        <Icon
            name="heroicons:chevron-left"
            v-if="isOpen"
            class="toggle-icon"
        />
        <Icon
            name="heroicons:chevron-right"
            v-else
            class="toggle-icon"
        />
      </button>
    </div>

    <nav class="navigation">
      <LayoutMenu/>
    </nav>
  </aside>
</template>

<style lang="sass" scoped>
.sidebar
  width: var(--sidebar-width-expanded)
  height: 100vh
  background-color: var(--color-bg)
  border-right: var(--border-width) solid var(--color-border)
  padding: var(--spacing-5) 0
  box-shadow: var(--shadow-md)
  overflow-y: auto
  transition: width 0.3s ease

  &--collapsed
    width: var(--sidebar-width-collapsed)

    .nav-link span
      display: none

    .logo-link
      padding: 0

.sidebar__header
  display: flex
  align-items: center
  justify-content: space-between
  padding: 0 var(--spacing-4)
  margin-bottom: var(--spacing-6)

.logo-link
  display: block

.logo
  max-width: 100%
  height: auto

.toggle-btn
  background: none
  border: none
  cursor: pointer
  padding: var(--spacing-2)
  color: var(--color-text-secondary)
  transition: color 0.2s ease

  &:hover
    color: var(--color-primary)

.toggle-icon
  width: 20px
  height: 20px
</style>
