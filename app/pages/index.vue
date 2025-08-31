<script setup lang="ts">
import type {ICard, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery} from "~/components/kanban/useKanbanQuery";

useSeoMeta({
  title: 'Home | CRM System'
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);

const {data: boardData, isLoading} = useKanbanQuery();
</script>

<template>
  <div class="container">
    <h1 class="title">CRM Dashboard</h1>

    <div class="card-wrapper">
      <UiCard draggable="true">
        <UiCardHeader role="button">Карточка клиента</UiCardHeader>

        <UiCardContent>
          <p>Основная информация о клиенте будет отображаться здесь.</p>
        </UiCardContent>

        <UiCardDescription>Описание карточки</UiCardDescription>

        <UiCardFooter>Дата создания: 01.01.2023</UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<style scoped lang="sass">
.container
  padding: var(--spacing-6)

  .title
    margin-bottom: var(--spacing-6)
    color: var(--color-text)
    font-size: var(--font-size-3xl)
    font-weight: var(--font-weight-semibold)

.card-wrapper
  max-width: 400px
</style>
