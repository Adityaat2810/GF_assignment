<template>
  <div class="relative w-full max-w-md mx-auto">
    <div class="relative">

      <div class=" 
       absolute inset-y-0 left-0 pl-3 flex 
       items-center pointer-events-none"
      >
        <SearchIcon 
          class="h-8 w-8 mr-5 text-gray-400 
          dark:text-gray-500 transition-colors 
          duration-200
          " 
        />
      </div>

      <input
        :value="query"
        type="text"
        placeholder="Search anything..."
        class="
          w-full
          pl-12
          pr-16
          py-4
          text-xl
          text-gray-700
          dark:text-gray-100
          bg-white
          dark:bg-gray-800
          border
          border-gray-300
          dark:border-gray-700
          rounded-xl
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          dark:focus:ring-blue-400
          focus:border-blue-500
          dark:focus:border-blue-400
          transition-all
          duration-300
          ease-in-out
          placeholder-gray-400
          dark:placeholder-gray-500
        "
        @input="emitSearch"
      />

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
          dark:text-gray-500
          hover:text-gray-600
          dark:hover:text-gray-300
          transition-colors
          duration-200
        "
      >
        <XIcon class="h-5 w-5" />
      </button>

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
          dark:text-gray-500
          hover:text-gray-600
          dark:hover:text-gray-300
          transition-colors
          duration-200
        "
      >
        <FilterIcon class="h-5 w-5" />
      </button>
    </div>

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
        class="
          absolute 
          z-10 
          mt-2 
          w-full 
          bg-white 
          dark:bg-gray-800
          border 
          border-gray-200 
          dark:border-gray-700
          rounded-xl 
          shadow-lg
          overflow-hidden
        "
      >
        <div class="p-4">
          <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Filter Options
          </h3>
          <div class="space-y-2">
            <label 
              class="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <input 
                type="checkbox" 
                class="mr-2 text-blue-500 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
              />
              Recent Searches
            </label>
            <label 
              class="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <input 
                type="checkbox" 
                class="mr-2 text-blue-500 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
              />
              Popular Searches
            </label>
          </div>
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
