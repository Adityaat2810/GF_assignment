<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Search Tool</h1>
        <SearchBar @search="handleSearch" />
        <transition name="fade" mode="out-in">
          <Loader v-if="isLoading" />
          <SearchResultList
            v-else-if="searchResults.length"
            :results="searchResults"
          />
          <p v-else-if="searchQuery && !isLoading" class="text-gray-600 mt-4">
            No results found for "{{ searchQuery }}"
          </p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchBar from './components/SearchBar.vue'
import SearchResultList from './components/SearchResultList.vue'
import Loader from './components/Loader.vue'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

const handleSearch = (query) => {
  searchQuery.value = query
}

// Simulating API call with delay
const fetchSearchResults = async (query) => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulating network delay
  
  // Mock search results
  const mockResults = [
    { id: 1, title: 'Vue.js Documentation', description: 'Official documentation for Vue.js framework.' },
    { id: 2, title: 'React vs Vue', description: 'A comparison between React and Vue frameworks.' },
    { id: 3, title: 'Vue CLI', description: 'Standard tooling for Vue.js development.' },
    { id: 4, title: 'Vuex State Management', description: 'Centralized state management for Vue.js applications.' },
    { id: 5, title: 'Vue Router', description: 'Official router for Vue.js applications.' },
  ]
  
  searchResults.value = mockResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  )
  
  isLoading.value = false
}

watch(searchQuery, (newQuery) => {
  if (newQuery) {
    fetchSearchResults(newQuery)
  } else {
    searchResults.value = []
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>