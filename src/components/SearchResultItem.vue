<template>
  <li 
    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
    @click="toggleExpanded"
  >
    <div class="p-4 flex items-center">
      <div class="relative">
        <img
          :src="result.urls.thumb"
          :alt="result.alt_description || 'Unsplash image'"
          class="w-20 h-20 object-cover rounded-lg mr-5 transition-transform duration-300 group-hover:scale-110"
        />
        <div 
          class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
        >
          {{ result.user.total_photos }}
        </div>
      </div>
      
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-blue-600">
          {{ result.user.name }}
        </h3>
        <p class="text-sm text-gray-500 line-clamp-2">
          {{ result.alt_description || 'No description available' }}
        </p>
      </div>
      
      <div class="ml-auto">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-gray-400 transform transition-transform duration-300"
          :class="{ 'rotate-180': expanded }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>

    <transition 
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 max-h-0 scale-95"
      enter-to-class="opacity-100 max-h-96 scale-100"
      leave-from-class="opacity-100 max-h-96 scale-100"
      leave-to-class="opacity-0 max-h-0 scale-95"
    >
      <div 
        v-if="expanded" 
        class="px-4 pb-4 bg-gray-50 border-t border-gray-200 space-y-3"
      >
        <div class="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <span class="block text-xs text-gray-500 mb-1">Created</span>
            <span class="font-medium">{{ formatDate(result.created_at) }}</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <span class="block text-xs text-gray-500 mb-1">Dimensions</span>
            <span class="font-medium">{{ result.width }}x{{ result.height }}px</span>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <span class="block text-xs text-gray-500 mb-1">Color</span>
            <div class="flex items-center">
              <span 
                class="inline-block w-4 h-4 rounded-full mr-2 shadow-md"
                :style="{ backgroundColor: result.color }"
              ></span>
              <span class="font-medium">{{ result.color }}</span>
            </div>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <span class="block text-xs text-gray-500 mb-1">Photos</span>
            <span class="font-medium">{{ result.user.total_photos }}</span>
          </div>
        </div>
        
        <div class="mt-2 flex justify-end">
          <a
            :href="result.links.html"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <span>View on Unsplash</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4v2m0 0v2m0-2h2m-2 0H14m5-4v4M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-14a2 2 0 00-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </transition>
  </li>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    required: true
  }
})

const expanded = ref(false)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<!-- <template>
  <li 
    class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="toggleExpanded"
  >
    <div class="flex items-center">
      <img 
        :src="result.urls.thumb" 
        :alt="result.alt_description || 'Unsplash image'"
        class="w-16 h-16 object-cover rounded-md mr-4"
      />
      <div>
        <h3 class="text-lg font-semibold text-gray-800">
          {{ result.user.name }}
        </h3>
        <p class="text-sm text-gray-500">
          {{ result.alt_description || 'No description' }}
        </p>
      </div>
    </div>

    <transition name="expand">
      <div v-if="expanded" class="mt-4 space-y-2">
        <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <span class="font-medium">Created:</span> 
            {{ formatDate(result.created_at) }}
          </div>
          <div>
            <span class="font-medium">Width:</span> 
            {{ result.width }}px
          </div>
          <div>
            <span class="font-medium">Height:</span> 
            {{ result.height }}px
          </div>
          <div>
            <span class="font-medium">Color:</span> 
            <span 
              class="inline-block w-4 h-4 rounded-full" 
            ></span>
            {{ result.color }}
          </div>
        </div>
        
        <div class="mt-2">
          <a 
            :href="result.links.html" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </transition>
  </li>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  result: {
    type: Object,
    required: true
  }
})

const expanded = ref(false)

const toggleExpanded = () => {
  expanded.value = !expanded.value
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style> -->
