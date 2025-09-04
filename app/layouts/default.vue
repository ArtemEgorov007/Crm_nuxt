<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {account} from '~/utils/appwrite'

import {useAuthStore, useIsLoadingStore} from '~~/store/auth.store'

const router = useRouter()
const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const user = await account.get()
    if (user) {
      authStore.set(user)
    }
  } catch {
    router.push('/login')
  } finally {
    isLoadingStore.set(false)
  }
})
</script>

<template>
  <transition name="fade-loader">
    <LayoutLoader v-if="isLoadingStore.isLoading" class="loader-fixed"/>
  </transition>

  <div v-show="!isLoadingStore.isLoading" :class="{ layout: authStore.isAuth }">
    <LayoutSidebar v-if="authStore.isAuth"/>

    <main class="layout__main">
      <slot/>
    </main>
  </div>
</template>

<style scoped lang="sass">
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

.loader-fixed
  position: fixed
  inset: 0
  background-color: var(--color-bg)
  display: flex
  align-items: center
  justify-content: center
  z-index: var(--z-index-modal)

/* Плавное появление/исчезновение */
.fade-loader-enter-active,
.fade-loader-leave-active
  transition: opacity 0.3s ease

.fade-loader-enter-from,
.fade-loader-leave-to
  opacity: 0
</style>
