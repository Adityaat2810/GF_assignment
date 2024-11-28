<template>
  <transition-group name="list" tag="ul" class="
      mt-8 
      space-y-5 
      px-2
      scrollbar-thin 
      scrollbar-thumb-gray-300 
      dark:scrollbar-thumb-gray-600
      scrollbar-track-transparent
      hover:scrollbar-thumb-gray-400
      dark:hover:scrollbar-thumb-gray-500
      transition-all
      duration-300
    ">
    <SearchResultItem v-for="result in results" :key="result.id" :result="result" />
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