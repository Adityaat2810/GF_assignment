<template>
  <div class="relative">
    
    <input
      v-model="query"
      type="text"
      placeholder="Search..."
      class="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
      @input="emitSearch"
    />
    <button
      class="absolute right-0 top-0 mt-2 mr-4 text-gray-600 hover:text-gray-800"
      @click="clearSearch"
    >
      <XIcon v-if="query" class="h-5 w-5" />
      <SearchIcon v-else class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { SearchIcon, XIcon } from 'lucide-vue-next'

const query = ref('')
const emit = defineEmits(['search'])

const emitSearch = () => {
  emit('search', query.value)
}

const clearSearch = () => {
  query.value = ''
  emitSearch()
}

watch(query, () => {
  emitSearch()
})
</script>