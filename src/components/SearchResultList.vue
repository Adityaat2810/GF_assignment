<template>
  <transition-group name="list" tag="ul" class="mt-6 space-y-4">
    <SearchResultItem
      v-for="result in results"
      :key="result.id"
      :result="result"
    />
  </transition-group>
</template>

<script setup>
import { defineProps } from 'vue'
import SearchResultItem from './SearchResultItem.vue'

defineProps({
  results: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>