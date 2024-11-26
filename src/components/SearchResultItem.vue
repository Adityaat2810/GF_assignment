<template>
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
</style>
