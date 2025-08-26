<script setup lang="ts">
import { account } from '~/utils/appwrite'

import { useAuthStore, useIsLoadingStore } from '~~/store/auth.store'

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
  <LayoutLoader v-if="isLoadingStore.isLoading" />

  <div v-else :class="{ layout: authStore.isAuth }">
    <LayoutSidebar v-if="authStore.isAuth" />

    <main class="layout__main">
      <slot />
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
</style>
