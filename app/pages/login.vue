<script setup lang="ts">
import {v4 as uuid} from 'uuid'
import {account} from '@/utils/appwrite'
import {useAuthStore, useIsLoadingStore} from '~~/store/auth.store'

useSeoMeta({title: 'Login | CRM System'})

const email = ref('')
const password = ref('')

const router = useRouter()
const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()

const login = async () => {
  try {
    isLoadingStore.set(true)

    await account.createEmailPasswordSession(email.value, password.value)
    const response = await account.get()

    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status
      })

      email.value = ''
      password.value = ''

      await router.push('/')
    }
  } catch (error) {
    console.error('Ошибка входа:', error)
  } finally {
    isLoadingStore.set(false)
  }
}

const register = async () => {
  try {
    isLoadingStore.set(true)
    await account.create(uuid(), email.value, password.value)
    await login()
  } catch (error) {
    console.error('Ошибка регистрации:', error)
  } finally {
    isLoadingStore.set(false)
  }
}
</script>

<template>
  <section class="login">
    <div class="login__container">
      <header class="login__header">
        <h1 class="login__title">Вход в систему</h1>
        <p class="login__subtitle">
          Введите свои учетные данные для доступа к CRM
        </p>
      </header>

      <form class="login__form" @submit.prevent="login">
        <UiInput
            v-model="email"
            id="login-email"
            label="Email"
            placeholder="Введите ваш  email"
            type="email"
            required
        />

        <UiInput
            v-model="password"
            id="login-password"
            label="Пароль"
            placeholder="Введите ваш пароль"
            type="password"
            required
        />

        <UiButton type="submit" variant="primary" size="lg" block>
          Войти
        </UiButton>
      </form>

      <footer class="login__footer">
        <NuxtLink to="/" class="login__link">Забыли пароль?</NuxtLink>
        <NuxtLink @click.prevent="register" to="/" class="login__link">Создать аккаунт</NuxtLink>
      </footer>
    </div>
  </section>
</template>

<style scoped lang="sass">
.login
  display: flex
  align-items: center
  justify-content: center
  min-height: 100vh
  padding: var(--spacing-6)
  background-color: var(--color-bg-alt)

.login__container
  width: 100%
  max-width: 420px
  background-color: var(--color-card-bg)
  border-radius: var(--radius-xl)
  padding: var(--spacing-8)
  box-shadow: var(--shadow-lg)
  border: var(--border-width) solid var(--color-card-border)
  display: flex
  flex-direction: column
  gap: var(--spacing-6)

.login__header
  text-align: center

.login__title
  font-size: var(--font-size-3xl)
  font-weight: var(--font-weight-bold)
  color: var(--color-text)
  margin-bottom: var(--spacing-2)

.login__subtitle
  font-size: var(--font-size-base)
  color: var(--color-text-secondary)
  line-height: var(--line-height-normal)

.login__form
  display: flex
  flex-direction: column
  gap: var(--spacing-4)

.login__footer
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: var(--spacing-4)
  border-top: var(--border-width) solid var(--color-border)
  font-size: var(--font-size-sm)

.login__link
  color: var(--color-primary)
  font-weight: var(--font-weight-medium)
  transition: color var(--transition-normal) ease

  &:hover
    color: var(--color-primary-hover)
    text-decoration: underline

@media (max-width: 768px)
  .login__container
    padding: var(--spacing-6)

  .login__title
    font-size: var(--font-size-2xl)

  .login__footer
    flex-direction: column
    gap: var(--spacing-3)
</style>
