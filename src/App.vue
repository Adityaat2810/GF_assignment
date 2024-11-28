<template>
  <div class="min-h-screen bg-gray-100 
    dark:bg-gray-900 flex items-center 
    justify-center p-4 transition-colors 
    duration-300 font-inter"
  >
    <div class="w-full max-w-4xl bg-white 
      dark:bg-gray-800 rounded-lg shadow-xl 
      overflow-hidden"
    >
      <div class="p-8">
        <div class="flex justify-between 
          items-center mb-6"
        >
          <div class="flex items-center space-x-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-10 w-10 text-green-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="2.5"></circle>
              <path d="M21 15l-5-5L5 21"></path>
            </svg>
            <h1 class="
              text-3xl font-bold text-gray-800 
              dark:text-gray-100
            ">
              ImageQuest
            </h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleDarkMode" 
              class="
                p-2 rounded-full bg-gray-200 
                dark:bg-gray-700 text-gray-800 
                dark:text-gray-100
                hover:bg-gray-300
                dark:hover:bg-gray-600
                transition-colors
              "
              aria-label="Toggle dark mode"
            >
              <span v-if="darkMode">🌙</span>
              <span v-else>☀️</span>
            </button>
          </div>
        </div>
        
        <div class="mb-6 text-center">
          <p class="
            text-gray-600 
            dark:text-gray-400 
            mb-4 
            max-w-2xl 
            mx-auto
            text-lg
          ">
            Discover millions of high-quality, royalty-free images from talented creators worldwide. 
            Find the perfect visual for your next project with just a few clicks.
          </p>
        </div>
        
        <SearchBar @search="handleSearch" />
        
        <div
          ref="scrollContainer"
          class="
            mt-6
            overflow-y-auto 
            max-h-[500px] 
            scrollbar-thin 
            scrollbar-thumb-gray-300 
            dark:scrollbar-thumb-gray-600
            border 
            border-gray-200 
            dark:border-gray-700 
            rounded-lg
          "
          @scroll="handleScroll"
        >
          <transition name="fade" mode="out-in">
            <Loader v-if="isLoading && !searchResults.length" />
            <SearchResultList
              v-else-if="searchResults.length"
              :results="searchResults"
            />
            <div 
              v-else-if="searchQuery && !isLoading" 
              class="
                text-center 
                p-8 
                text-gray-600 
                dark:text-gray-400
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <p class="text-xl mb-2">No results found for "{{ searchQuery }}"</p>
              <p>Try different keywords or check your spelling</p>
            </div>
            
            <div 
              v-else 
              class="
                text-center 
                p-8 
                text-gray-600 
                dark:text-gray-400
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p class="text-xl mb-2">Find Your Perfect Image</p>
              <p>Search for photos, illustrations, and more</p>
            </div>
          </transition>
          
          <div
            v-if="isLoading && searchResults.length > 0"
            class="text-center py-4"
          >
            <Loader/>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <p class="
            text-sm 
            text-gray-500 
            dark:text-gray-500
          ">
            Powered by Unsplash | © 2024 ImageQuest
          </p>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(136, 136, 136, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.3);
  border-radius: 10px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 102, 102, 0.5);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

html {
  scroll-behavior: smooth;
}

.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(136, 136, 136, 0.3) transparent;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
