<script setup lang="ts">
import { defineProps } from 'vue'
import {useMutation} from "@tanstack/vue-query";
import {v4} from "uuid";

import { COLLECTION_DEALS, DB_ID } from '~~/app.constants'
import type { IDeal } from '~~/types/deals.types'

</script>

<template>
  <div>
    <p>добавление сделки</p>
  </div>
</template>

<style lang="sass" scoped>

</style>
