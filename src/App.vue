<template>
  <div class="min-h-screen bg-gray-100 
    dark:bg-gray-900 flex items-center 
    justify-center p-4 transition-colors 
    duration-300"
  >
    <div class="w-full max-w-3xl bg-white 
      dark:bg-gray-800 rounded-lg shadow-xl 
      overflow-hidden"
      >
      <div class="p-8">
        <div class="flex justify-between 
          items-center mb-6"
        >
          <h1 class="
            text-3xl font-bold text-gray-800 
            dark:text-gray-100
          ">
            Search Tool
          </h1>
          <button 
            @click="toggleDarkMode" 
            class="
              p-2 rounded-full bg-gray-200 
              dark:bg-gray-700 text-gray-800 
              dark:text-gray-100
              "
          >
            <span v-if="darkMode">🌙</span>
            <span v-else>☀️</span>
          </button>
        </div>
        
        <SearchBar @search="handleSearch" />
        
        <div
          ref="scrollContainer"
          class="overflow-y-auto max-h-[600px] 
           scrollbar-thin scrollbar-thumb-gray-300 
           dark:scrollbar-thumb-gray-600
          "
          @scroll="handleScroll"
        >
          <transition name="fade" mode="out-in">
            <Loader v-if="isLoading" />
            <SearchResultList
              v-else-if="searchResults.length"
              :results="searchResults"
            />
            <p
              v-else-if="searchQuery && !isLoading"
              class="text-gray-600 dark:text-gray-400 mt-4"
            >
              No results found for "{{ searchQuery }}"
            </p>
          </transition>
          
          <!-- loader indicator for pagination -->
          <div
            v-if="isLoading && searchResults.length > 0"
            class="text-center py-4"
          >
            <Loader/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import SearchBar from './components/SearchBar.vue'
import SearchResultList from './components/SearchResultList.vue'
import Loader from './components/Loader.vue'

const store = useStore()
const scrollContainer = ref(null)
const darkMode = ref(false)

const searchQuery = computed(() => store.getters.getSearchQuery)
const searchResults = computed(() => store.getters.getSearchResults)
const isLoading = computed(() => store.getters.isLoading)
const hasMore = computed(() => store.getters.hasMoreResults)

const handleSearch = (query) => {
  store.dispatch('updateSearchQuery', query)
}

const handleScroll = () => {
  if (!scrollContainer.value) return
  
  const { scrollTop, clientHeight, scrollHeight } = scrollContainer.value
  if (scrollHeight - scrollTop - clientHeight < 200 && !isLoading.value && hasMore.value) {
    store.dispatch('loadMoreImages')
  }
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
  localStorage.setItem('darkMode', darkMode.value.toString())
}

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode) {
    darkMode.value = savedMode === 'true'
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
