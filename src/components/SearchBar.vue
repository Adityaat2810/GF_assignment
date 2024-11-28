
<template>
  <div class="w-full max-w-xl mx-auto relative">
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon 
          class="h-6 w-6 text-gray-500 dark:text-gray-400 
          group-focus-within:text-green-600 
          transition-colors duration-300" 
        />
      </div>

      <input
        :value="query"
        type="text"
        placeholder="Search images..."
        class="
          w-full
          pl-12
          pr-20
          py-3
          rounded-2xl
          text-lg
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-gray-100
          border-2
          border-gray-200
          dark:border-gray-700
          focus:border-green-600
          dark:focus:border-green-700
          focus:ring-4
          focus:ring-green-500/20
          dark:focus:ring-green-600/20
          outline-none
          transition-all
          duration-300
          ease-in-out
          placeholder-gray-500
          dark:placeholder-gray-600
        "
        @input="emitSearch"
      />

      <div class="absolute right-0 inset-y-0 flex items-center pr-2 space-x-1">
        <button
          v-if="query"
          @click="clearSearch"
          class="
            p-2
            rounded-full
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition-colors
            group
          "
        >
          <XIcon class="h-5 w-5 group-hover:rotate-90 transition-transform" />
        </button>

        <button
          @click="toggleFilter"
          class="
            p-2
            rounded-full
            text-gray-500
            dark:text-gray-400
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition-colors
            group
          "
          :class="{ 'text-green-600': showFilter }"
        >
          <FilterIcon 
            class="h-5 w-5 
            group-hover:rotate-12 
            transition-transform" 
          />
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="showFilter" 
        class="
          absolute 
          z-20 
          mt-2 
          w-full 
          bg-white 
          dark:bg-gray-800
          rounded-xl 
          shadow-2xl
          border 
          border-gray-200 
          dark:border-gray-700
          overflow-hidden
        "
      >
        <div class="p-4 space-y-3">
          <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Filter Options
          </h3>
          <div class="space-y-2">
            <label class="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                class="
                  mr-3 
                  rounded 
                  text-green-600 
                  focus:ring-green-500 
                  dark:bg-gray-700 
                  dark:border-gray-600
                "
              />
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors">
                Recent Searches
              </span>
            </label>
            <label class="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                class="
                  mr-3 
                  rounded 
                  text-green-600 
                  focus:ring-green-500 
                  dark:bg-gray-700 
                  dark:border-gray-600
                "
              />
              <span class="text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors">
                Popular Searches
              </span>
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