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
import axios from 'axios'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)

const handleSearch = (query) => {
  searchQuery.value = query
}

const api = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ""

const searchImages = async () => {
  // Reset previous state
  if (!api) {
    error.value = 'API key is missing'
    return
  }

  // Reset previous state
  isLoading.value = true
  searchResults.value = []
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchQuery.value,
        per_page: 12,
        client_id: api
      }
    })

    searchResults.value = response.data.results
    console.log(searchResults.value[0])
    isLoading.value = false
  } catch (err) {
    error.value = 'Failed to fetch images'
    isLoading.value = false
    console.error('Search error:', err)
  }
}


watch(searchQuery, (newQuery) => {
  if (newQuery) {
    // fetchSearchResults(newQuery)
    searchImages(newQuery)
  } else {
    searchImages.value = []
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