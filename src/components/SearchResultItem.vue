<template>
  <li 
    class="
      bg-white 
      dark:bg-gray-800 
      rounded-2xl 
      shadow-lg 
      hover:shadow-xl 
      transition-all 
      duration-300 
      transform 
      hover:-translate-y-2 
      cursor-pointer 
      overflow-hidden 
      group
      border-2
      border-transparent
      hover:border-green-100
      dark:hover:border-green-900
    "
    @click="toggleExpanded"
  >
    <div class="p-5 flex items-center">
      <div class="relative flex-shrink-0 mr-6">
        <img
          :src="result.urls.thumb"
          :alt="result.alt_description || 'Unsplash image'"
          class="
            w-24 
            h-24 
            object-cover 
            rounded-xl 
            transition-transform 
            duration-300 
            group-hover:scale-110
            shadow-md
          "
        />
        <div 
          class="
            absolute 
            -bottom-2 
            -right-2 
            bg-green-600 
            text-white 
            rounded-full 
            w-6 
            h-6 
            flex 
            items-center 
            justify-center 
            text-xs 
            font-bold
            shadow-md
          "
        >
          {{ result.user.total_photos }}
        </div>
      </div>
      
      <div class="flex-1">
        <h3 
          class="
            text-2xl 
            font-bold 
            text-gray-800 
            dark:text-gray-100 
            mb-2 
            transition-colors 
            duration-300 
            group-hover:text-green-700
            dark:group-hover:text-green-500
          "
        >
          {{ result.user.name }}
        </h3>
        <p 
          class="
            text-sm 
            text-gray-600 
            dark:text-gray-400 
            line-clamp-2
          "
        >
          {{ result.alt_description || 'No description available' }}
        </p>
      </div>
      
      <div className="ml-auto pl-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="
            h-7 
            w-7 
            text-gray-400 
            dark:text-gray-500 
            transform 
            transition-all 
            duration-300
            hover:text-green-600
          "
          :class="{ 'rotate-180 text-green-600': expanded }"
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
        class="
          p-4
          bg-gray-50 
          dark:bg-gray-900 
          border-t 
          border-gray-200 
          dark:border-gray-700 
          space-y-3
        "
      >
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div 
            class="
              bg-white 
              dark:bg-gray-800 
              p-3 
              rounded-lg 
              shadow-sm 
              dark:shadow-none 
              dark:border 
              dark:border-gray-700
            "
          >
            <span class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Created</span>
            <span class="font-medium text-gray-800 dark:text-gray-100">
              {{ formatDate(result.created_at) }}
            </span>
          </div>
          <div 
            class="
              bg-white 
              dark:bg-gray-800 
              p-3 
              rounded-lg 
              shadow-sm 
              dark:shadow-none 
              dark:border 
              dark:border-gray-700
            "
          >
            <span class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Dimensions</span>
            <span class="font-medium text-gray-800 dark:text-gray-100">
              {{ result.width }}x{{ result.height }}px
            </span>
          </div>
          <div 
            class="
              bg-white 
              dark:bg-gray-800 
              p-3 
              rounded-lg 
              shadow-sm 
              dark:shadow-none 
              dark:border 
              dark:border-gray-700
            "
          >
            <span class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Color</span>
            <div class="flex items-center">
              <span 
                class="inline-block w-4 h-4 rounded-full mr-2 shadow-md"
                :style="{ backgroundColor: result.color }"
              ></span>
              <span class="font-medium text-gray-800 dark:text-gray-100">
                {{ result.color }}
              </span>
            </div>
          </div>
          <div 
            class="
              bg-white 
              dark:bg-gray-800 
              p-3 
              rounded-lg 
              shadow-sm 
              dark:shadow-none 
              dark:border 
              dark:border-gray-700
            "
          >
            <span class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Photos</span>
            <span class="font-medium text-gray-800 dark:text-gray-100">
              {{ result.user.total_photos }}
            </span>
          </div>
        </div>
        
        <div class="mt-2 flex justify-end">
          <a
            :href="result.links.html"
            target="_blank"
            rel="noopener noreferrer"
            class="
              px-4 
              py-2 
              bg-blue-500 
              text-white 
              rounded-lg 
              hover:bg-blue-600 
              dark:hover:bg-blue-700 
              transition-colors 
              duration-300 
              flex 
              items-center 
              space-x-2
            "
          >
            <span>View on Unsplash</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4v2m0 0v2m0-2h2m-2 0H14m5-4v4M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-14a2 2 0 00-2 2z" 
              />
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