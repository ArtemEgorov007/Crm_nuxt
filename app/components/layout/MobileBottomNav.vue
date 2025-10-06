<script setup lang="ts">
import {MENU_DATA} from "~/components/layout/menu.data"
import {account} from '@/utils/appwrite'
import {useAuthStore, useIsLoadingStore} from '~~/store/auth.store'

const router = useRouter()
const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()

const mobileMenuItems = computed(() => {
  return MENU_DATA.filter(item =>
      ['Home', 'Products', 'Orders', 'Customers', 'Settings'].includes(item.name)
  )
})

const logout = async () => {
  try {
    isLoadingStore.set(true)
    await account.deleteSession('current')
    authStore.clear()
    await router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
}

const isLogoutVisible = ref(false)

const toggleLogout = () => {
  isLogoutVisible.value = !isLogoutVisible.value
}
</script>

<template>
  <div class="mobile-bottom-nav">
    <div class="nav-items">
      <NuxtLink
          v-for="item in mobileMenuItems"
          :key="item.name"
          :to="item.url"
          class="nav-item"
          active-class="nav-item--active"
      >
        <Icon :name="item.icon" class="nav-item__icon"/>
        <span class="nav-item__label">{{ item.name }}</span>
      </NuxtLink>

      <button
          class="nav-item nav-item--more"
          :class="{ 'nav-item--active': isLogoutVisible }"
          @click="toggleLogout"
      >
        <Icon name="radix-icons:dots-horizontal" class="nav-item__icon"/>
        <span class="nav-item__label">Ещё</span>
      </button>
    </div>

    <Transition name="dropdown">
      <div v-if="isLogoutVisible" class="additional-menu">
        <div class="additional-menu__content">
          <NuxtLink
              v-for="item in MENU_DATA.filter(item => !mobileMenuItems.some(mobile => mobile.name === item.name))"
              :key="item.name"
              :to="item.url"
              class="additional-item"
              @click="isLogoutVisible = false"
          >
            <Icon :name="item.icon" class="additional-item__icon"/>
            <span class="additional-item__label">{{ item.name }}</span>
          </NuxtLink>

          <div class="additional-item theme-toggle-item">
            <UiThemeToggle />
            <span class="additional-item__label">Тема</span>
          </div>

          <button class="additional-item additional-item--logout" @click="logout">
            <Icon name="heroicons:arrow-left-on-rectangle" class="additional-item__icon"/>
            <span class="additional-item__label">Выйти</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="sass">
.mobile-bottom-nav
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 1000
  background-color: var(--color-bg)
  border-top: 1px solid var(--color-border)
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1)
  backdrop-filter: blur(10px)

.nav-items
  display: flex
  justify-content: space-around
  align-items: center
  padding: var(--spacing-2) 0
  min-height: 60px

.nav-item
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: var(--spacing-1)
  padding: var(--spacing-2)
  background: none
  border: none
  cursor: pointer
  color: var(--color-text-secondary)
  text-decoration: none
  transition: all var(--transition-fast) ease
  border-radius: var(--radius-md)
  min-width: 60px
  position: relative

  &:hover
    color: var(--color-primary)
    background-color: var(--color-bg-secondary)

  &--active
    color: var(--color-primary)
    background-color: var(--color-primary-light)

  &--more
    position: relative

.nav-item__icon
  width: 20px
  height: 20px
  transition: transform var(--transition-fast) ease

.nav-item--active .nav-item__icon
  transform: scale(1.1)

.nav-item__label
  font-size: var(--font-size-xs)
  font-weight: var(--font-weight-medium)
  white-space: nowrap
  text-align: center

.additional-menu
  position: absolute
  bottom: 100%
  left: 0
  right: 0
  background-color: var(--color-bg)
  border-top: 1px solid var(--color-border)
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1)
  backdrop-filter: blur(10px)

.additional-menu__content
  padding: var(--spacing-4)
  display: flex
  flex-direction: column
  gap: var(--spacing-2)

.additional-item
  display: flex
  align-items: center
  gap: var(--spacing-3)
  padding: var(--spacing-3)
  background: none
  border: none
  cursor: pointer
  color: var(--color-text-secondary)
  text-decoration: none
  transition: all var(--transition-fast) ease
  border-radius: var(--radius-md)
  font-size: var(--font-size-sm)

  &:hover
    background-color: var(--color-bg-secondary)
    color: var(--color-text)

  &--logout
    color: var(--color-danger)
    border-top: 1px solid var(--color-border)
    margin-top: var(--spacing-2)
    padding-top: var(--spacing-4)

    &:hover
      background-color: var(--color-danger-light)
      color: var(--color-danger)

.theme-toggle-item
  display: flex
  align-items: center
  justify-content: center
  padding: var(--spacing-3)

.additional-item__icon
  width: 18px
  height: 18px

.additional-item__label
  font-weight: var(--font-weight-medium)

.dropdown-enter-active,
.dropdown-leave-active
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

.dropdown-enter-from
  opacity: 0
  transform: translateY(20px)

.dropdown-enter-to
  opacity: 1
  transform: translateY(0)

.dropdown-leave-from
  opacity: 1
  transform: translateY(0)

.dropdown-leave-to
  opacity: 0
  transform: translateY(20px)

// Адаптивность
@media (min-width: 769px)
  .mobile-bottom-nav
    display: none
</style>