<template>
  <li
    class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="toggleExpanded"
  >
    <h3 class="text-lg font-semibold text-gray-800">{{ result.title }}</h3>
    <transition name="expand">
      <p v-if="expanded" class="mt-2 text-gray-600">
        {{ result.description }}
      </p>
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
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 300px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>