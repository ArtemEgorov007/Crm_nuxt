<script setup lang="ts">
import dayjs from 'dayjs'
import type {IDeal} from '~~/types/deals.types'
import {useComments} from './useComments'
import {useCreateComment} from './useCreateComment'

const {data, refetch, isLoading} = useComments()
const {commentRef, writeComment} = useCreateComment({refetch})

const card = data as unknown as IDeal
</script>

<template>
  <div class="comments">
    <div class="comments__input">
      <input
          v-model="commentRef"
          class="comments__field"
          placeholder="Оставьте комментарий"
          @keyup.enter="writeComment"
      />
      <button
          class="comments__submit"
          :disabled="!commentRef"
          @click="writeComment"
      >
        <Icon name="radix-icons:paper-plane" size="16"/>
      </button>
    </div>

    <div v-if="isLoading" class="comments__loading">
      <div class="comments__skeleton"/>
    </div>

    <div v-else-if="card?.comments?.length" class="comments__list">
      <div
          v-for="comment in card.comments"
          :key="comment.$id"
          class="comment"
      >
        <div class="comment__icon">
          <Icon name="radix-icons:chat-bubble" size="20"/>
        </div>
        <div class="comment__content">
          <div class="comment__header">
            <span class="comment__time">
              Комментарий {{ dayjs(comment.$createdAt).format('HH:mm') }}
            </span>
          </div>
          <p class="comment__text">{{ comment.text }}</p>
        </div>
      </div>
    </div>

    <div v-else class="comments__empty">
      Нет комментариев
    </div>
  </div>
</template>

<style scoped lang="sass">
.comments
  padding: var(--spacing-4)
  border-top: var(--border-width) solid var(--color-border)

  &__input
    display: flex
    gap: var(--spacing-2)

  &__field
    flex: 1
    padding: var(--spacing-3)
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    background-color: var(--color-input-bg)
    color: var(--color-input-text)
    font-family: inherit
    font-size: var(--font-size-base)

    &:focus
      outline: none
      border-color: var(--color-border-focus)
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

    &::placeholder
      color: var(--color-input-placeholder)

  &__submit
    display: flex
    align-items: center
    justify-content: center
    padding: var(--spacing-3)
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    background-color: var(--color-button-primary-bg)
    color: var(--color-button-primary-text)
    cursor: pointer
    transition: background-color var(--transition-fast) ease

    &:hover:not(:disabled)
      background-color: var(--color-button-primary-bg-hover)

    &:disabled
      background-color: var(--color-button-disabled-bg)
      color: var(--color-button-disabled-text)
      cursor: not-allowed

  &__loading
    margin-top: var(--spacing-5)

  &__skeleton
    width: 100%
    height: 76px
    border-radius: var(--radius-md)
    background-color: var(--color-bg-secondary)
    animation: pulse 1.5s ease-in-out infinite

  &__list
    margin-top: var(--spacing-5)

  &__empty
    text-align: center
    padding: var(--spacing-8) var(--spacing-4)
    color: var(--color-text-tertiary)
    font-style: italic

.comment
  display: flex
  align-items: flex-start
  margin-bottom: var(--spacing-4)

  &:last-child
    margin-bottom: 0

  &__icon
    margin-right: var(--spacing-3)
    margin-top: var(--spacing-1)
    color: var(--color-text-secondary)

  &__content
    flex: 1
    padding: var(--spacing-3)
    border: var(--border-width) solid var(--color-border)
    border-radius: var(--radius-md)
    background-color: var(--color-bg-secondary)

  &__header
    margin-bottom: var(--spacing-2)

  &__time
    font-size: var(--font-size-sm)
    color: var(--color-text-tertiary)

  &__text
    color: var(--color-text)
    line-height: var(--line-height-normal)

@keyframes pulse
  0%, 100%
    opacity: 1
  50%
    opacity: 0.5
</style>
