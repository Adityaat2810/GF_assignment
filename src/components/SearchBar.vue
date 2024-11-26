<template>
  <div class="relative w-full max-w-md mx-auto">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon class="h-8 w-8 mr-5 text-gray-400 transition-colors duration-200" />
      </div>
      
      <input
        :value="query"
        type="text"
        placeholder="Search anything..."
        class="
          w-full
          pl-10
          pr-16
          py-5
          text-xl
          text-gray-700
          bg-white
          border
          border-gray-300
          rounded-xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition-all
          duration-300
          ease-in-out
          placeholder-gray-400
        "
        @input="emitSearch"
      />
      
      <!-- Clear Button -->
      <button 
        v-if="query"
        @click="clearSearch"
        class="
          absolute
          right-12
          inset-y-0
          flex
          items-center
          pr-3
          text-gray-400
          hover:text-gray-600
          transition-colors
          duration-200
        "
      >
        <XIcon class="h-5 w-5" />
      </button>
      
      <!-- Filter/Search Button -->
      <button
        @click="toggleFilter"
        class="
          absolute
          right-0
          inset-y-0
          flex
          items-center
          pr-3
          text-gray-400
          hover:text-gray-600
          transition-colors
          duration-200
        "
      >
        <FilterIcon class="h-5 w-5" />
      </button>
    </div>
    
    <!-- Optional Filter Dropdown (can be expanded) -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div
        v-if="showFilter"
        class="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg"
      >
        <!-- Filter options can go here -->
        <div class="p-4">
          <p class="text-sm text-gray-500">Filter options coming soon...</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { SearchIcon, XIcon, FilterIcon } from 'lucide-vue-next'

const store = useStore()

const query = computed({
  get: () => store.getters.getSearchQuery,
  set: (value) => store.dispatch('updateSearchQuery', value)
})

const showFilter = ref(false)
const emit = defineEmits(['search', 'filter'])

const emitSearch = (event) => {
  const searchQuery = event.target.value
  store.dispatch('updateSearchQuery', searchQuery)
  emit('search', searchQuery)
}

const clearSearch = () => {
  store.dispatch('updateSearchQuery', '')
  emit('search', '')
}

const toggleFilter = () => {
  showFilter.value = !showFilter.value
  emit('filter', showFilter.value)
}
</script>

