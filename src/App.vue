<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8 ">

        <h1 class="text-3xl font-bold flex justify-center text-gray-800 mb-6">
          Search Tool
        </h1>

        <SearchBar @search="handleSearch" />

        <div 
          ref="scrollContainer" 
          class="overflow-y-auto max-h-[600px]"
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
              class="text-gray-600 mt-4"
            >
              No results found for "{{ searchQuery }}"
            </p>
          </transition>

          <!-- loadre indicator for pagintaion -->

          <div 
            v-if="isLoading && searchResults.length>0"
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
import { computed,ref } from 'vue'
import { useStore } from 'vuex'
import SearchBar from './components/SearchBar.vue'
import SearchResultList from './components/SearchResultList.vue'
import Loader from './components/Loader.vue'

const store = useStore()
const scrollContainer=ref(null)

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



</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
