<script setup lang="ts">
import {MENU_DATA} from "~/components/layout/menu.data"

interface Props {
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isCollapsed: false
})
</script>

<template>
  <div class="menu">
    <NuxtLink
        class="menu-item"
        :class="{ 'menu-item--collapsed': isCollapsed }"
        v-for="item in MENU_DATA"
        :key="item.name"
        :to="item.url"
        active-class="menu-item--active"
    >
      <Icon :name="item.icon" class="menu-item__icon"/>
      <span v-if="!isCollapsed" class="menu-item__text">{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="sass">
.menu
  width: 100%

.menu-item
  display: flex
  align-items: center
  padding: var(--spacing-3) var(--spacing-5)
  color: var(--color-text-secondary)
  text-decoration: none
  transition: all var(--transition-normal) ease-in-out
  margin-bottom: var(--spacing-2)
  font-weight: var(--font-weight-medium)
  white-space: nowrap
  overflow: hidden

  &:hover
    background-color: var(--color-bg-tertiary)
    color: var(--color-text)
    box-shadow: var(--shadow-sm)


  &--active
    background-color: var(--color-bg-tertiary)
    color: var(--color-primary)
    font-weight: var(--font-weight-semibold)


  &--collapsed
    justify-content: center
    padding: var(--spacing-3)


  &__icon
    min-width: 20px
    width: 20px
    height: 20px


  &__text
    margin-left: var(--spacing-3)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

@media (max-width: 768px)
  .menu-item
    justify-content: center
    padding: var(--spacing-3)

    &__text
      display: none
</style>
