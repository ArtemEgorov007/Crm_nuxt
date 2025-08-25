<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
      :type="type"
      class="ui-btn"
      :class="[
      `ui-btn--${variant}`,
      `ui-btn--${size}`,
      { 'ui-btn--block': block, 'ui-btn--loading': loading }
    ]"
      :disabled="disabled || loading"
      :aria-busy="loading"
      @click="handleClick"
  >
    <span v-if="loading" class="ui-btn__spinner"></span>
    <span class="ui-btn__content">
      <slot/>
    </span>
  </button>
</template>

<style scoped lang="sass">
.ui-btn
  position: relative
  display: inline-flex
  align-items: center
  justify-content: center
  border: var(--border-width) solid transparent
  border-radius: var(--radius-md)
  font-weight: var(--font-weight-medium)
  cursor: pointer
  transition: all var(--transition-normal) ease-in-out
  white-space: nowrap
  user-select: none
  font-family: inherit

  &:focus
    outline: none

  &:disabled
    cursor: not-allowed
    opacity: 0.6

  &--block
    display: flex
    width: 100%

  &--loading
    pointer-events: none

  &__spinner
    width: 1em
    height: 1em
    border: 2px solid currentColor
    border-right-color: transparent
    border-radius: 50%
    margin-right: var(--spacing-2)
    animation: spin 1s linear infinite

  &__content
    display: flex
    align-items: center
    justify-content: center

  &--primary
    background-color: var(--color-button-primary-bg)
    color: var(--color-button-primary-text)
    border-color: var(--color-button-primary-bg)

    &:hover:enabled
      background-color: var(--color-button-primary-bg-hover)
      border-color: var(--color-button-primary-bg-hover)

    &:focus
      box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25)

  &--secondary
    background-color: var(--color-button-secondary-bg)
    color: var(--color-button-secondary-text)
    border-color: var(--color-button-secondary-bg)

    &:hover:enabled
      background-color: var(--color-button-secondary-bg-hover)
      border-color: var(--color-button-secondary-bg-hover)

    &:focus
      box-shadow: 0 0 0 0.2rem rgba(100, 116, 139, 0.25)

  &--outline
    background-color: transparent
    color: var(--color-button-outline-text)
    border-color: var(--color-button-outline-border)

    &:hover:enabled
      background-color: var(--color-button-outline-border)
      color: var(--color-white)

    &:focus
      box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25)

  &--ghost
    background-color: transparent
    color: var(--color-button-ghost-text)
    border-color: transparent

    &:hover:enabled
      background-color: var(--color-bg-tertiary)

  &--link
    background-color: transparent
    color: var(--color-button-ghost-text)
    border-color: transparent

    &:hover:enabled
      color: var(--color-button-ghost-text-hover)
      text-decoration: underline

  &--sm
    padding: var(--spacing-1) var(--spacing-2)
    font-size: var(--font-size-sm)

  &--md
    padding: var(--spacing-2) var(--spacing-3)
    font-size: var(--font-size-base)

  &--lg
    padding: var(--spacing-3) var(--spacing-4)
    font-size: var(--font-size-lg)

@keyframes spin
  to
    transform: rotate(360deg)
</style>

<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; Основная кнопка &ndash;&gt;-->
<!--    <Button @click="handleClick">Нажми меня</Button>-->

<!--    &lt;!&ndash; Кнопка загрузки &ndash;&gt;-->
<!--    <Button :loading="true">Загрузка...</Button>-->

<!--    &lt;!&ndash; Второстепенная кнопка &ndash;&gt;-->
<!--    <Button variant="secondary">Второстепенная</Button>-->

<!--    &lt;!&ndash; Контурная кнопка &ndash;&gt;-->
<!--    <Button variant="outline">Контурная</Button>-->

<!--    &lt;!&ndash; Большая кнопка &ndash;&gt;-->
<!--    <Button size="lg">Большая кнопка</Button>-->

<!--    &lt;!&ndash; Кнопка на всю ширину &ndash;&gt;-->
<!--    <Button block>На всю ширину</Button>-->
<!--  </div>-->
<!--</template>-->
