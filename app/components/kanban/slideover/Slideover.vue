<script setup lang="ts">
import {computed} from 'vue'
import {useDealSlideStore} from '~~/store/deal-slide.store'

const store = useDealSlideStore()

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: (value: boolean) => {
    store.isOpen = value
  }
})
</script>

<template>
  <div class="slideover-wrapper">
    <Transition name="slideover-overlay">
      <div
          v-if="isLocalOpen"
          class="slideover-overlay"
          @click="isLocalOpen = false"
      >
        <Transition name="slideover">
          <div v-if="isLocalOpen" class="slideover-container" @click.stop>
            <div class="slideover-card">
              <div class="slideover-header">
                <KanbanSlideoverTop/>
              </div>
              <div class="slideover-body">
                <KanbanSlideoverComments/>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style lang="sass" scoped>
.slideover-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: var(--z-index-modal)
  pointer-events: none

.slideover-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: var(--color-bg-overlay)
  opacity: 1
  pointer-events: auto

.slideover-overlay-enter-active
  transition: opacity var(--transition-slow) ease

.slideover-overlay-leave-active
  transition: opacity var(--transition-slow) ease

.slideover-overlay-enter-from
  opacity: 0

.slideover-overlay-leave-to
  opacity: 0

.slideover-container
  position: absolute
  top: 0
  right: 0
  width: 100%
  max-width: 384px
  height: 100%
  display: flex
  flex-direction: column
  pointer-events: auto

.slideover-enter-active
  transition: transform var(--transition-slow) ease

.slideover-leave-active
  transition: transform var(--transition-slow) ease

.slideover-enter-from
  transform: translateX(100%)

.slideover-enter-to
  transform: translateX(0)

.slideover-leave-from
  transform: translateX(0)

.slideover-leave-to
  transform: translateX(100%)

.slideover-card
  display: flex
  flex-direction: column
  flex: 1 1 0%
  overflow-y: auto
  background-color: var(--color-card-bg)
  height: 100%
  box-shadow: var(--shadow-lg)
  border-left: var(--border-width) solid var(--color-border)

  .slideover-header
    padding: var(--spacing-4)
    border-bottom: var(--border-width) solid var(--color-border)

.slideover-body
  flex: 1
  overflow-y: auto
</style>
